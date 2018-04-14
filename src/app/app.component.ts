import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class ShoppyHourApp {
  rootPage:any = SplashPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage
  ) {
    platform.ready().then(() => {
      setTimeout(() => {
        storage.get('username').then(username => {
          if (username) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        })
      }, 4000);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
