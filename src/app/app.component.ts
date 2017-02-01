import {App, IonicApp, NavController, NavParams, MenuController,Nav} from 'ionic-angular';
import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/Login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform , private app: IonicApp) {
  
    //this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  initializeApp() {
      //this.rootPage = HomePage;
  }
}
