import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {FirebaseApp} from "angularfire2";

import {BaseService} from "../base/base";

import {User} from "../../model/user.model";


@Injectable()
export class UserService extends BaseService{

  users: Observable<User[]>
  currentUser: AngularFireObject<User>;

  constructor(protected  afDataBase: AngularFireDatabase,
              protected  firebaseApp: FirebaseApp,
              protected http: HttpClient) {
    super();
  }

  create(user: User): Promise<void> {
    return this.afDataBase.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

}
