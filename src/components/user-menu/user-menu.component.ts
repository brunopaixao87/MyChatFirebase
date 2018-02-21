import {Component, Input} from '@angular/core';
import {BaseComponent} from '../base/base.component';
import {AlertController, App, MenuController} from 'ionic-angular';
import {AuthService} from '../../providers/auth/auth.service';
import {User} from '../../model/user.model';
import {UserProfilePage} from '../../pages/user-profile/user-profile';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;


  constructor(protected alertCtrl: AlertController,
              protected app: App,
              protected authService: AuthService,
              protected menuCrtl: MenuController) {
    super(alertCtrl, app, authService, menuCrtl);
  }

  onProfile(): void {
   this.navCtrl.push(UserProfilePage);
  }

}
