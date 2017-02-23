import { Component } from '@angular/core';

import { NavController,ViewController,NavParams,AlertController } from 'ionic-angular';
// import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import { Spinnerservice } from '../../../shared/services/spinner';
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-myLeaveDetails',
  templateUrl: 'myLeaveDetails.html',
  providers:[LeaveService,UserService,Spinnerservice]
})
export class MyLeaveDetails {

  leave: any;
  leaveID: number;
   isCancelled:boolean;

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService,
    public spinner:Spinnerservice,
    public viewCtrl: ViewController,
    public params:NavParams,
    public alertCtrl:AlertController) {
  
     this.isCancelled = false;
     this.leave =  params.get('leave');  
      this.leaveID = this.leave.LeaveRequestMasterId;
  }

   cancelClicked() {
        let leaveTobeCancelled= {
            Status: 'Cancelled',
            LeaveRequestMasterId: this.leaveID,
            ID: this.leave.ID
        };
        this.leaveService.deleteLeaveRecord(leaveTobeCancelled).subscribe((res:any) => {
            if (res) {
             this.showToast(res.Message);
              this.isCancelled = true;
            this.dismiss()
            } else {
                //this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
            }
        },
        error=>
        {
          this.showToast('Failed to cancel leave.');
        });
    }

    showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Leave',
      message: 'Do you want to cancel selected leave?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            console.log('Agree clicked');
            this.cancelClicked();
          }
        }
      ]
    });
    confirm.present();
  }
  

     showToast(message:string)
  {
    Toast.show(message, '5000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
  }

  dismiss()
  {
      this.viewCtrl.dismiss({changedStatus:this.isCancelled});
  }

}



