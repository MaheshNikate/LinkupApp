import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AboutPage } from '../../about/about';

@Component({
  selector: 'page-applyforleave',
  templateUrl: 'applyforleave.html'
})
export class ApplyForLeave {

  selectedTabIndex: number = 1;
  AboutRoot: any = AboutPage;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

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
