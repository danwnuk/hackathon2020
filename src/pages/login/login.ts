import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form [formGroup]="loginForm" novalidate> 
        <ion-list>
          <ion-item-group>
            <ion-item>
              <ion-input placeholder="Username" highlight-color="balanced" type="text" formControlName="username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input placeholder="Password" highlight-color="energized" type="password" formControlName="password"></ion-input>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <div class="padding">
            <button class="button button-full button-assertive ink" 
                [style.height]="'40px'" 
                [disabled]="!loginForm.valid"
                (click)="login()">
                Login
            </button>
        </div>
      </form>
    </ion-content>
  `,
  styles: [`
  `]
})
export class LoginPage {
  loginForm: FormGroup;

  errorMessage: string;

  constructor(
      public navCtrl: NavController,
      public rest: RestProvider,
      public fb: FormBuilder,
      public storage: Storage
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.loginForm);
  }

  login() {
    this.storage.set('username', this.loginForm.controls['username'].value);

    this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
  }

}