import {App, IonicApp, NavController, NavParams, MenuController,Nav,AlertController} from 'ionic-angular';
import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import 'rxjs/add/observable/fromEvent';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/Login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage :any;
  isOnline:boolean;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform , private app: IonicApp ,public alertCtrl:AlertController,
  public unauthorizedEvent: Events , public apCtrl:App) {
  
    //this.initializeApp();

     var offline = Observable.fromEvent(document, "offline");
    var online = Observable.fromEvent(document, "online");
    this.isOnline = false;

    offline.subscribe(() => {
      this.isOnline = false;
       this.showAlert('Connection','You are not connected to internet!');
    });

    online.subscribe(()=>{
      this.isOnline = true;
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

    this.unauthorizedEvent.subscribe('Token Expired', (user, time) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
   this.tpkenExpiredAlert('Session Expired','Please Login again.');
    });

   // this.initializeApp();
  }

  

    showAlert(title:string, subTitle:string) {
      if(this.isOnline)
      return;
      
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.onDidDismiss(() => this.showAlert('Connection','You are not connected to internet!'));
            alert.present();
        }

        tpkenExpiredAlert(title:string, subTitle:string) {
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.onDidDismiss(() =>  this.apCtrl.getRootNav().setRoot(LoginPage));
            alert.present();
        }

}
