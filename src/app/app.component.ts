import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SigninPage} from '../pages/signin/signin';
import {User} from '../model/user.model';
import {AuthService} from '../providers/auth/auth.service';
import {UserService} from '../providers/user/user.service';

import * as firebase from 'firebase/app';
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SigninPage;
  currentUser: User;

  constructor(protected authService: AuthService,
              protected platform: Platform,
              protected statusBar: StatusBar,
              protected splashScreen: SplashScreen,
              protected userService: UserService) {

    this.initPageRoot();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  private initPageRoot(): void {
    this.authService
      .afAuth
      .authState
      .subscribe((authUser: firebase.User) => {

        if (authUser) {

          this.rootPage = HomePage;

          this.userService.currentUser
            .valueChanges()
            .subscribe((user: User) => {
              this.currentUser = user;
            });

        } else {

          this.rootPage = SigninPage;

        }

      });
  }
}

