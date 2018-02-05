import {Component, Input} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {AlertController, App, MenuController} from "ionic-angular";
import {AuthService} from "../../providers/auth/auth.service";

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title: string;

  constructor(protected alertCtrl: AlertController,
              protected app: App,
              protected authService: AuthService,
              protected menuCrtl: MenuController) {
    super(alertCtrl, app, authService, menuCrtl);
  }

}
