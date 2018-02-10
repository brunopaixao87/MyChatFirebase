import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth/auth.service";
import {User} from "../../model/user.model";
import {UserService} from "../../providers/user/user.service";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  pageTitle: string;
  sender: User;
  recipientUser: User;


  constructor(protected autnService: AuthService,
              protected navCtrl: NavController,
              protected navParams: NavParams,
              protected userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.autnService.authenticated;
  }

  ionViewDidLoad() {
    this.recipientUser = this.navParams.get('recipientUser');
    this.pageTitle = this.recipientUser.name;
    this.userService.mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
      });
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
