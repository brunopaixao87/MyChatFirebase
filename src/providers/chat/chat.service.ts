import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseService} from "../base/base";
import {Chat} from "../../model/chat.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";

@Injectable()
export class ChatService extends BaseService{

  constructor(
    public afAuth: AngularFireAuth,
    public afDataBase: AngularFireDatabase,
    public http: HttpClient) {
    super();
    console.log('Hello ChatProvider Provider');
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
