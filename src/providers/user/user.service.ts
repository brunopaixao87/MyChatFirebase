import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import {FirebaseApp} from 'angularfire2';

import {BaseService} from '../base/base';

import {User} from '../../model/user.model';

import * as firebase from 'firebase/app';


@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(protected  afDataBase: AngularFireDatabase,
              protected  firebaseApp: FirebaseApp,
              protected http: HttpClient) {
    super();
     this.lodingUsersFromBase();
  }

  private lodingUsersFromBase(): void {
    this.users = this.mapListKeys(
      this.afDataBase
        .list<User>(`/users/`, (ref: firebase.database.Reference) => ref.orderByChild('name'))
    );
  }

  create(user: User): Promise<void> {
    return this.afDataBase.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.afDataBase.list(`/users/`, (ref: firebase.database.Reference) => ref.orderByChild('username').equalTo(username))
      .valueChanges()
      .map((usersEquals: any[]) => {
        return usersEquals.length > 0;
      }).catch(this.handleObservableError);
  }

}
