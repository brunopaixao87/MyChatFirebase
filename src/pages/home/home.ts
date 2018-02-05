import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {UserService} from '../../providers/user/user.service';
import {AuthService} from '../../providers/auth/auth.service';
import {Observable} from "rxjs/Observable";
import {User} from "../../model/user.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';

  constructor(
              protected autnService: AuthService,
              protected navCtrl: NavController,
              protected userService: UserService
              ) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.autnService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
