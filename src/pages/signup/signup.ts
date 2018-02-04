import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../providers/auth/auth.service";
import {UserService} from "../../providers/user/user.service";

import {User} from "../../model/user.model";


import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  singupForm: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected navCtrl: NavController,
              protected alertCtrl: AlertController,
              protected loadingCtrl: LoadingController,
              protected navParams: NavParams,
              protected authService: AuthService,
              protected userService: UserService) {

    this.onCreateFormValidation();

  }

  private onCreateFormValidation(): void {
    this.singupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onsubmit(): void {
    this.onSaveUserAuth();
  }

  private onSaveUserAuth(): void {

    let loading = this.showLoading();
    let user: User = this.singupForm.value;

    this.authService.createAuthUser({email: user.email, password: user.password})
      .then((authState: firebase.User) => {
        delete user.password
        user.uid = authState.uid;
        this.onSaveUserForm(user, loading);
        loading.dismiss();
      }).catch((erro: any) => {
      loading.dismiss();
      this.showAlert(erro);
    });
  }

  private onSaveUserForm(user: User, loading: any): void {
    this.userService.create(user)
      .then(() => {
        console.log('Usuário Cadastrado!')
      }).catch((erro: any) => {
      loading.dismiss();
      this.showAlert(erro);
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

}
