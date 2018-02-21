import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { User } from "../../model/user.model";

import * as firebase from 'firebase/app';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(protected autnService: AuthService,
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.autnService.authenticated;
  }

  ionViewDidLoad() {
    this.userService
      .currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.filePhoto) {
      this.editUserToPhoto();
      return;

    }

    const uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);
    const task = uploadTask.task;

    task.on('state_changed', (snapshot: UploadTaskSnapshot) => {
      this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }, (error: Error) => {
      console.log('Erro no upload!');
      console.log(error);
    });

    task.then((uploadTaskSnapshot: any) => {
      this.editUserToPhoto(uploadTaskSnapshot.downloadURL)
    });


  }

  private editUserToPhoto(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
      });
  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

}
