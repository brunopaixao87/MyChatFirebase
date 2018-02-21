import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseService} from "../base/base";
import {Chat} from "../../model/chat.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";

import * as firebase from 'firebase/app';

@Injectable()
export class ChatService extends BaseService{

  chats: AngularFireList<Chat>;

  constructor(
    public afAuth: AngularFireAuth,
    public afDataBase: AngularFireDatabase,
    public http: HttpClient) {
    super();
   this.setChats();
  }

  private setChats(): void {
    this.afAuth.authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {

          this.chats = this.afDataBase.list<Chat>(`/chats/${authUser.uid}`,
            (ref: firebase.database.Reference) => ref.orderByChild('timestamp')
          );

        }
      });
  }

  create(chat: Chat, userIdRecipient: string, userIdSender: string): Promise<void> {
    return this.afDataBase.object<Chat>(`/chats/${userIdRecipient}/${userIdSender}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userIdRecipient: string, userIdSender: string): AngularFireObject<Chat> {
    return this.afDataBase.object<Chat>(`/chats/${userIdRecipient}/${userIdSender}`);
  }

}
