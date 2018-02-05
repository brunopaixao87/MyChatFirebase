import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../providers/auth/auth.service';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(protected authService: AuthService,
              protected alertCtrl: AlertController,
              protected navCtrl: NavController,
              protected formBuilder: FormBuilder,
              protected loadingCtrl: LoadingController,
              protected navParams: NavParams) {
    this.onCreateForm();
  }

  singinForm: FormGroup;

  private onCreateForm(): void {
    this.singinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onsubmit(): void {
    const userAuth = this.singinForm.value;
    this.onAuthentication(userAuth);
  }

  private onAuthentication(userAuth: any): void {
    let loading = this.showLoading();
    this.authService.signInWithEmailAndPassword(userAuth)
      .then((isLogged: boolean) => {
        if (!isLogged) {
          loading.dismiss();
          this.showAlert(`Email ou senha inválidos!`);
          return;
        }
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);

      }).catch(erro => {
      loading.dismiss();
      this.showAlert(`Email ou senha inválidos!`);
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

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
