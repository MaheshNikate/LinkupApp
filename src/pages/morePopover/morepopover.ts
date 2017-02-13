import { Component , EventEmitter, Output} from '@angular/core';

import { ViewController, NavController, App, ModalController,NavParams } from 'ionic-angular';

// import { SupportPage } from '../support/support';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close(true)">Approve</button>
      <button ion-item (click)="close(false)">Reject</button>
    </ion-list>
  `
})
export class MorePopoverPage {

  public leave:any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    private params: NavParams
  ) {

this.leave = params;
    //  this.callback = this.params.get('cb')
   }

  //  public loadc(x) {
	  
	//    this.callback(x)
	  
	//   // Close the popover
	//   this.close();
	// }

  support() {
    //this.app.getRootNav().push(SupportPage);
    this.viewCtrl.dismiss();
  }

  close(isapproove: boolean) {
   
    this.viewCtrl.dismiss(this.leave,isapproove);
  }
}