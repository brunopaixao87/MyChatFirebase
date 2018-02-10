import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {UserService} from '../../providers/user/user.service';
import {AuthService} from '../../providers/auth/auth.service';
import {Observable} from "rxjs/Observable";
import {User} from "../../model/user.model";
import {ChatPage} from "../chat/chat";
import {ChatService} from "../../providers/chat/chat.service";
import {Chat} from "../../model/chat.model";

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';

  constructor(
              protected autnService: AuthService,
              protected chatService: ChatService,
              protected navCtrl: NavController,
              protected userService: UserService
              ) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.autnService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(recipientUser: User): void {

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {

        this.chatService
          .mapObjectKey<Chat>(this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
          .first()
          .subscribe((chat: Chat) => {

            if (!chat.title) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            }

          });

      });

    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
