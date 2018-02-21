import {OnInit} from '@angular/core';
import {AlertController, App, MenuController, NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth.service';
import {SigninPage} from '../../pages/signin/signin';

export abstract class BaseComponent implements OnInit {

  constructor(protected alertCtrl: AlertController,
              protected app: App,
              protected authService: AuthService,
              protected menuCrtl: MenuController) {
  }

  protected navCtrl: NavController;

  ngOnInit(): void {
    this.navCtrl = this.app.getActiveNav();

  }

  onLogout(): void {
    this.alertCtrl.create({
      message: 'Do you wnat to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.authService.logout()
              .then(()=>{
                this.navCtrl.setRoot(SigninPage);
                this.menuCrtl.enable(false,'user-menu');
              });
          }
        },
        {
          text: 'No'
        }]
    }).present();
  }

}
