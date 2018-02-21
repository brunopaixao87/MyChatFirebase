import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {UserService} from '../../providers/user/user.service';
import {AuthService} from '../../providers/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {ChatPage} from '../chat/chat';
import {ChatService} from '../../providers/chat/chat.service';
import {Chat} from '../../model/chat.model';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: Observable<Chat[]>;
  users: Observable<User[]>;
  view: string = 'chats';

  constructor(protected autnService: AuthService,
              protected chatService: ChatService,
              protected menuCtrl: MenuController,
              protected navCtrl: NavController,
              protected userService: UserService) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.autnService.authenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
      .map((chats: Chat[]) => chats.reverse());
    this.users = this.userService.users;

    this.menuCtrl.enable(true, 'user-menu');
  }

  filterItem(event: any): void {
    const searchTerm: string = event.target.value;


    this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
      .map((chats: Chat[]) => chats.reverse());
    this.users = this.userService.users;

    if (searchTerm) {

      switch (this.view) {

        case 'chats':
          this.chats = this.chats
            .map((chats: Chat[]) => chats.filter((chat: Chat) => (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1)));
          break;

        case 'users':
          this.users = this.users
            .map((users: User[]) => users.filter((user: User) => (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)));
          break;

      }

    }

  }

  onChatOpen(chat: Chat): void {
    const idUserRecipientChat = chat.$key;
    this.userService.mapObjectKey<User>(this.userService.getUserById(idUserRecipientChat))
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });
      });
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

              const timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              const chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              const chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
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
