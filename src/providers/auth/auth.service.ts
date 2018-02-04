import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

import {BaseService} from "../base/base";

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService extends BaseService{

  constructor(protected  afAuth: AngularFireAuth,
              public http: HttpClient) {
    super();
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User>{
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

}
