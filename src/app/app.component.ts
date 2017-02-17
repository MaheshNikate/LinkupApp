import {App, IonicApp, NavController, NavParams, MenuController,Nav,AlertController} from 'ionic-angular';
import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/Login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage :any;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform , private app: IonicApp ,public alertCtrl:AlertController) {
  
    //this.initializeApp();

     var offline = Observable.fromEvent(document, "offline");
    var online = Observable.fromEvent(document, "online");

    offline.subscribe(() => {
       this.showAlert('Connection','You are not connected to internet!');
    });

    online.subscribe(()=>{
       console.log('Internet Connection is avaialable!');
    });
    
        if (localStorage.getItem('accessToken')) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

   // this.initializeApp();
  }

    showAlert(title:string, subTitle:string) {
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.onDidDismiss(() => this.showAlert('Connection','You are not connected to internet!'));
            alert.present();
        }

}
