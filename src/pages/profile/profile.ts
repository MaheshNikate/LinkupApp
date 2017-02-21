import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { AuthService } from '../Login/login.service';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers:[AuthService]
})
export class ProfilePage {

   public userDetail : any;
    selectedTabIndex: number = 1;
    AboutRoot: any = AboutPage;
    constructor(public navCtrl: NavController, 
    private toastCtrl: ToastController,
    public authService : AuthService) {
       this.userDetail=this.authService.getCurrentUser();
    }

    selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  presentChangeOrendationToast() {
    let toast = this.toastCtrl.create({
      message: 'Rotate screen to rerendering.',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}