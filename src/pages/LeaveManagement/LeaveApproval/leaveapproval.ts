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

public isSelectall:boolean;
public leavechecked: boolean;
public editMode: boolean;
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
selectedEmployees: any[];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController , private leaveService: LeaveService) {
   
    this.model = {
            comments: ''
        };

    this.selectedEmployees = [];

    this.getLeavesToApprove()
  }

  /*Get Leaves to Approve*/

  getLeavesToApprove()
  {
     this.isSelectall = false;
     this.leavechecked = false;
      this.model.comments = '';
     this.leaveService.getApproverLeaves()
    .subscribe(
      (res:any) =>  {
        console.log("Data from server", res); 
        this.leaveObs = res;
        this.leaveObs.forEach(leave => {
          this.selectLeave(leave,false);
        });
        
      });
    
  }

  /*long press list */
  getEditMode()
  {
    this.editMode = true;
  }
/*Approve/ Reject Leaves */

approveLeave(sLeave:any , slidingItem: ItemSliding)
  {
    slidingItem.close();
    this.selectedLeave = sLeave;
    this.showApproveRejectPromt(true);
  }
  rejectLeave(sLeave:any , slidingItem: ItemSliding)
  {
    slidingItem.close();
    this.selectedLeave = sLeave;
    this.showApproveRejectPromt(false);
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
                        this.showAlert('Success!','Leave Approved');
                        this.getLeavesToApprove();
                    } else {
                        this.showAlert('Failed!','Request failed');
                        this.rejected = true;
                        this.approved = false;
                    }
                });
    }

    rejectClicked() {
       
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
                        this.approved = true;
                        this.showAlert('Success!','Leave Rejected');
                        this.getLeavesToApprove();
                    } else {
                        this.showAlert('Failed!','Request failed');
                        this.rejected = true;
                        this.approved = false
                    }
                });
    }

/*Selection of Leaves */

  selectAllLeaves()
  {
    this.isSelectall = !this.isSelectall;
    if(this.isSelectall == true)
    {
      this.selectedEmployees = [];
      this.leaveObs.forEach(leave => {
          this.selectLeave(leave,true);
        });
    }
    else
    {
      this.selectedEmployees = [];
      this.editMode = false;
        this.leaveObs.forEach(leave => {
          this.selectLeave(leave,false);
        });
    }
    
  }
  selectLeaveClicked(leave:any, slidingItem: ItemSliding , checked:boolean , index:number)
  {
    slidingItem.close();
    this.selectLeave(leave,leave.selected);
   
  }
  selectLeave(leave:any ,checked:boolean)
  {
     if(checked == false)
    {
      var index : number = 0;
      this.leaveObs.forEach(leaves => {
          if(leaves == leave)
          {
            this.selectedEmployees.splice(index,1);
          }
          index ++;
        });
      leave.selectionColor = "white";
      leave.selected = false;
    }
    else
    {
      this.selectedEmployees.push(leave);
      leave.selectionColor = "limegreen";
      leave.selected = true;
    }
   this.setboolean();
  }
  setboolean()
  {
    this.leavechecked = false;
    this.isSelectall = false;
    if(this.selectedEmployees && this.selectedEmployees.length > 0)
    {
      this.leavechecked = true;

      var count : number = 0;
      this.leaveObs.forEach(leaves => {
          count ++;
        });
      if(count == this.selectedEmployees.length)
        {
          this.isSelectall = true;
        }
    }
  }
  
  
  /* Approve/Reject prompt */

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
            var cmt = this.model.comments;
            
            if(isApprove == 'Approve')
            {
            if(cmt.length == 0)
            {
              this.model.comments = '';
              this.showApproveRejectPromt(true);
              return;
             }
              if(this.leavechecked)
              this.sendRequest('Approved');
              else
              this.approveClicked();
            }
            else
            {
              if(cmt.length == 0)
            {
              this.model.comments = '';
              this.showApproveRejectPromt(false);
              return;
             }
              if(this.leavechecked)
              this.sendRequest('Rejected');
              else
              this.rejectClicked();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  

  /*Bulk Approval */

   approveBulkLeave()
  {
    this.showApproveRejectPromt(true);
  }

  rejectBulkLeave()
  {
    this.showApproveRejectPromt(false);
  }


  assembleReqPayload(status: string) {
    var payload:any = [];
    for (var index in this.selectedEmployees) {
      payload.push(
        {
          ID: this.selectedEmployees[index].ID,
          Comment: this.model.comments,
          Status: status
        });
    }

    return payload;
  }

  sendRequest(status:any) {
    return this.leaveService.updateLeaveRecord(1, this.assembleReqPayload(status)).subscribe(res => {
      if (res) {
        if (status === 'Rejected') {
          this.rejected = false;
          this.approved = true;
          this.showAlert('Success!','Selected leaves Rejected');
          
        } else {
          this.rejected = true;
          this.approved = false;
          this.showAlert('Success!','Selected leaves Approved');
          
        }
       this.getLeavesToApprove();
        this.selectedEmployees = [];
      } else {
        this.showAlert('Failed!','Request failed');
      }
    });
  }

/* Alert */
  showAlert(title:string, subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
