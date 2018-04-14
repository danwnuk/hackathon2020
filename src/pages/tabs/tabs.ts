import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { OffersPage } from '../offers/offers';
import { SearchPage } from '../search/search';
import { StoresPage } from '../stores/stores';
import { LogoutPage } from '../logout/logout';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OffersPage;
  tab2Root = StoresPage;
  tab3Root = SearchPage;
  tab4Root = LogoutPage;

  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) {
    
  }

  ionViewDidLoad() {
    
  }

  logout() {
    this.storage.remove('username');

    this.navCtrl.setRoot(LoginPage);
  }
}
