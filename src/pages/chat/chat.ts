import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth/auth.service";
import {UserService} from "../../providers/user/user.service";
import {AngularFireList, AngularFireObject} from "angularfire2/database";
import {Message} from "../../model/message.model";
import {MessageService} from "../../providers/message/message.service";
import {ChatService} from "../../providers/chat/chat.service";

import {Chat} from "../../model/chat.model";
import {User} from "../../model/user.model";

import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";

/**
 * Adicionar InifitteScroll
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipientUser: User;
  private senderChat: AngularFireObject<Chat>;
  private recipientChat: AngularFireObject<Chat>;


  constructor(protected autnService: AuthService,
              protected chatService: ChatService,
              protected messageService: MessageService,
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
        console.log('passou')
        this.loadingMessages();

        this.loadingChatsUsers();

      });
  }

  private loadingMessages(): void {

    let doSubscription = () => {
      this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
      this.viewMessages
        .subscribe((messages: Message[]) => {
          this.scrollToBottom();
        });
    };

    this.messages = this.messageService
      .getMessagesById(this.sender.$key, this.recipientUser.$key);
    this.messages
      .valueChanges()
      .first()
      .subscribe((messages: Message[]) => {
        if (messages.length !== 0) {
          doSubscription();
          return;
        }

        this.messages = this.messageService
          .getMessagesById(this.recipientUser.$key, this.sender.$key,);
        doSubscription();
      });
  }

  private loadingChatsUsers(): void{
    this.senderChat = this.chatService.getDeepChat(this.sender.$key, this.recipientUser.$key);
    this.recipientChat = this.chatService.getDeepChat(this.recipientUser.$key, this.sender.$key);
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }

  sendMessage(newMessage: string): void {
    if (!newMessage) {
      return;
    }
    const timestamp: Object = firebase.database.ServerValue.TIMESTAMP;
    const message = new Message(this.sender.$key, newMessage, timestamp);

    this.messageService.addMessage(message, this.messages).then(() => {
      this.updatingChatsUsers(newMessage, timestamp);
    });
  }

  private updatingChatsUsers(newMessage: string, timestamp: any): void {
    this.senderChat
      .update({
        lastMessage: newMessage,
        timestamp: timestamp
      });

    this.recipientChat
      .update({
        lastMessage: newMessage,
        timestamp: timestamp
      });
  }

}
