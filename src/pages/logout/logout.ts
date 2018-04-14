import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Logout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      You have been successfully logged out.
    </ion-content>
  `,
  styles: [`
  `]
})
export class LogoutPage {

  errorMessage: string;

  constructor(
      public navCtrl: NavController,
      public storage: Storage
  ) {

    this.logout();
  }

  ionViewDidLoad() {
    this.logout();
    
  }

  logout() {
    this.storage.remove('username');

    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}