import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NgxChartsModule } from 'ngx-charts';
import { ShoppyHourApp } from './app.component';

import { OffersPage } from '../pages/offers/offers';
import { SearchPage } from '../pages/search/search';
import { StoresPage } from '../pages/stores/stores';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { SplashPage } from '../pages/splash/splash';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

const pageComponents = [
  ShoppyHourApp,
  OffersPage,
  SearchPage,
  StoresPage,
  TabsPage,
  LoginPage,
  LogoutPage,
  SplashPage
];

@NgModule({
  declarations: [
    ...pageComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(ShoppyHourApp),
    IonicStorageModule.forRoot(),
    NgxChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pageComponents
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Geolocation
  ]
})
export class AppModule {}
