import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import {BaseService} from '../base/base';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService extends BaseService {

  constructor(protected  afAuth: AngularFireAuth,
              public http: HttpClient) {
    super();
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.User> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signInWithEmailAndPassword(user: { email: string, password: string }): Promise<boolean> {
    return this.afAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then((authUser: firebase.User) => {
        return authUser != null;
      })
      .catch(this.handlePromiseError);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .first()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }

}
