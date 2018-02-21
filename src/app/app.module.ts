import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HttpClientModule} from '@angular/common/http';

import {AuthService} from '../providers/auth/auth.service';
import {UserService} from '../providers/user/user.service';

import {HomePage} from '../pages/home/home';
import {MyApp} from './app.component';
import {SignupPage} from '../pages/signup/signup';
import {SigninPage} from '../pages/signin/signin';
import {CustomLoggedHeaderComponent} from '../components/custom-logged-header/custom-logged-header.component';
import {CapitalizePipe} from '../pipes/capitalize/capitalize';
import {ChatPage} from '../pages/chat/chat';
import {ChatService} from '../providers/chat/chat.service';
import {MessageService} from '../providers/message/message.service';
import {MessageBoxComponent} from '../components/message-box/message-box.component';
import {UserInfoComponent} from '../components/user-info/user-info.component';
import {UserMenuComponent} from '../components/user-menu/user-menu.component';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyDA5sh07TnKTW2jJTvVaxylWwwqV0pZ3J0',
  authDomain: 'ionic-firebase-chat-a9360.firebaseapp.com',
  databaseURL: 'https://ionic-firebase-chat-a9360.firebaseio.com',
  projectId: 'ionic-firebase-chat-a9360',
  storageBucket: 'ionic-firebase-chat-a9360.appspot.com',
  messagingSenderId: '1015392744215'
};

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    CapitalizePipe,
    ChatPage,
    HomePage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SignupPage,
    SigninPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SignupPage,
    SigninPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    SplashScreen,
    StatusBar,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
