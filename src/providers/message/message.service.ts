import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from "../base/base";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Message} from "../../model/message.model";

import * as firebase from 'firebase/app';

@Injectable()
export class MessageService extends BaseService {

  constructor(protected afDataBase: AngularFireDatabase,
              protected http: HttpClient) {
    super();
  }

  addMessage(message: Message, listMessages: AngularFireList<Message>): Promise<any> {
    return Promise.resolve(listMessages.push(message));
  }

  getMessagesById(userIdRecipiet: string, userIdSender: string): AngularFireList<Message> {
    return this.afDataBase.list(`messages/${userIdRecipiet}-${userIdSender}`,
      (ref: firebase.database.Reference) => ref.limitToLast(30).orderByChild('timestamp'));
  }

}
