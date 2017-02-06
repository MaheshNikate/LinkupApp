import { Component } from '@angular/core';

import { NavController,Alert,ItemSliding,AlertController } from 'ionic-angular';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';
import { User } from '../models/user';
import { ApprovalForm } from '../models/leaveApprovalValidation';

@Component({
  selector: 'page-leaveapproval',
  templateUrl: 'leaveapproval.html',
  providers:[LeaveService]
})
export class LeaveApproval {

public isShowMyLeave:boolean;
public isSelectall:boolean;
public leavechecked: boolean;
public itemcolor:string;
leaveID: number;
leaveObs: Observable<Leave[]>;
selectedLeave:Leave;
userDetObs: Observable<User>;
requests: any;
servRows = 6;
model: any;
approverList:any;
validationMessage: string = '';
approved: boolean = false;
rejected: boolean = false;
leaveList:any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController , private leaveService: LeaveService) {
    this.isShowMyLeave = false;
    this.isSelectall = false;
    this.leavechecked = false;
    this.itemcolor = "white";

    this.model = {
            comments: ''
        };

    this.getLeavesToApprove()
  }

  /*Get Leaves to Approve*/

  getLeavesToApprove()
  {
    this.leaveObs = this.leaveService.getApproverLeaves();
    this.leaveObs.subscribe();
  }

  approveClicked() {
        // if (valid) {
        //    BACKEND CALL HERE
        this.leaveID = this.selectedLeave.ID;
            var params = [{
                ID: this.leaveID,
                Comment: this.model.comments,
                Status: 'Approved'
            }];

            this.leaveService.updateLeaveRecord(this.leaveID, params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = false;
                        this.approved = true
                        this.getLeavesToApprove();
                    } else {
                        this.rejected = true;
                        this.approved = false
                    }
                });
        // }
    }

    rejectClicked() {
        // if (valid) {
        //    BACKEND CALL HERE
        this.leaveID = this.selectedLeave.ID;
            var params = [{
                ID: this.leaveID,
                Comment: this.model.comments,
                Status: 'Rejected'
            }];

            this.leaveService.updateLeaveRecord(this.leaveID, params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = false;
                        this.approved = true
                        this.getLeavesToApprove();
                    } else {
                        this.rejected = true;
                        this.approved = false
                    }
                });
        // }
    }

  selectAllLeaves()
  {
    this.isSelectall = !this.isSelectall;
    
    if(this.isSelectall == true)
    {
      this.leavechecked = true;
      this.itemcolor = "limegreen";
    }
    else
    {
      this.itemcolor = "white";
    }
    
  }
  approveLeave(sLeave:any)
  {
    this.selectedLeave = sLeave;
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
            this.model.comments = data;
            if(isApprove == 'Approve')
            {
              this.approveClicked();
            }
            else
            {
              this.approveClicked();
            }
          }
        }
      ]
    });
    prompt.present();
  }


  

}
