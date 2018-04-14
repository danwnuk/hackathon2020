import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-splash',
  template: `
      <div [style.display]="'inline-block'"  [style.marginTop]="'55%'" [style.marginLeft]="'25px'" [style.marginRight]="'25px'">
        <img src="https://files.slack.com/files-tmb/T1038LNCA-F7NRUBS4E-0e45731e85/shoppy-hour-logo_480.png">
      </div>
  `,
  styles: [`
  `]
})
export class SplashPage {

  constructor(
      public navCtrl: NavController
  ) {

  }

  ionViewDidLoad() {
  }

}