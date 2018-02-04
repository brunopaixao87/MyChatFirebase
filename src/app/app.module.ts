import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {AngularFireModule, FirebaseAppConfig} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpClientModule} from "@angular/common/http";

import {AuthService} from '../providers/auth/auth.service';
import {UserService} from '../providers/user/user.service';

import {HomePage} from '../pages/home/home';
import {MyApp} from './app.component';
import {SignupPage} from "../pages/signup/signup";

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDA5sh07TnKTW2jJTvVaxylWwwqV0pZ3J0",
  authDomain: "ionic-firebase-chat-a9360.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-a9360.firebaseio.com",
  projectId: "ionic-firebase-chat-a9360",
  storageBucket: "ionic-firebase-chat-a9360.appspot.com",
  messagingSenderId: "1015392744215"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService
  ]
})
export class AppModule {
}
