import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import {FirebaseApp} from 'angularfire2';

import {BaseService} from '../base/base';

import {User} from '../../model/user.model';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(protected afAuth: AngularFireAuth,
              protected  afDataBase: AngularFireDatabase,
              protected  firebaseApp: FirebaseApp,
              protected http: HttpClient) {
    super();
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.afAuth.authState.subscribe((authUser: firebase.User) => {
      if(!authUser){
        return;
      }
      this.currentUser = this.afDataBase.object(`/users/${authUser.uid}`);
      this.lodingUsersFromBaseExcludingCurrentUser(authUser.uid);
    });
  }

  private lodingUsersFromBaseExcludingCurrentUser(uidToExclude: string): void {
    this.users = this.mapListKeys(
      this.afDataBase
        .list<User>(`/users/`, (ref: firebase.database.Reference) => ref.orderByChild('name'))
    ).map((usersDB: User[])=> {
      return usersDB.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  create(user: User, uuid: string): Promise<void> {
    return this.afDataBase.object(`/users/${uuid}`)
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
