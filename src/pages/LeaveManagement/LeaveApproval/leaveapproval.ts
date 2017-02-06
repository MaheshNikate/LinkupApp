import { Component } from '@angular/core';

import { NavController,Alert,ItemSliding,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-leaveapproval',
  templateUrl: 'leaveapproval.html'
})
export class LeaveApproval {

public isShowMyLeave:boolean;
public isSelectall:boolean;
public leavechecked: boolean;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
    this.isShowMyLeave = false;
    this.isSelectall = false;
    this.leavechecked = false;
  }
  selectAllLeaves()
  {
    this.isSelectall = !this.isSelectall;
    
    if(this.isSelectall == true)
    this.leavechecked = true;
  }
  approveLeave()
  {
    this.showApproveRejectPromt(true);
  }
  rejectLeave()
  {
    this.showApproveRejectPromt(false);
  }
  showApproveRejectPromt(approve:boolean)
  {
    var isApprove: String = "Approve";
    if(approve)
    isApprove = "Approve";
    else
    isApprove = "Reject";

let prompt = this.alertCtrl.create({
      title: 'Leave',
      message: "Enter a comment for Leave!",
      inputs: [
        {
          name: 'title',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: isApprove,
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  

}
