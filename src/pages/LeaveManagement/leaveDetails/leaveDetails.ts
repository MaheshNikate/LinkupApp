import { Component } from '@angular/core';

import { NavController,ViewController,NavParams } from 'ionic-angular';
// import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import { Spinnerservice } from '../../../shared/services/spinner';

@Component({
  selector: 'page-leaveDetails',
  templateUrl: 'leaveDetails.html',
  providers:[LeaveService,UserService,Spinnerservice]
})
export class LeaveDetails {

  public leaveObs: Observable<Leave>;
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: any;
  servRows = 5;
  leaves: {};
  leave: any;
  leaveID: number;
  leaveList:any;
  leavDtl:any;
  userDetail:any;
  submitted:boolean;
  ishowLeaveDetails:boolean;
  isPending: boolean=false;
   model: any;
   comments:string;
   approved: boolean = false;
   rejected: boolean = false;
  approverList:any;
  commentForm: FormGroup;

  public isShowMyLeave:boolean;

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService,
    public spinner:Spinnerservice,
    public viewCtrl: ViewController,
    public params:NavParams,
    public formBuilder: FormBuilder) {
     this.model = {
            comments: ''
        };
        this.comments = '';
         this.commentForm = formBuilder.group({
        comment: ['', Validators.compose([Validators.minLength(2),Validators.maxLength(600), Validators.required])]
       });
 
     this.leave =  params.get('leave');  
      this.isShowMyLeave = false;
      this.leaves = [];
      this.leaveID = this.leave.LeaveRequestMasterId;
      this.ishowLeaveDetails = false;
      this.submitted = false;
      this.getLeaves();
    
  }
  getLeaves()
  {
      
      this.leaveService.getLeaveDetailByRefID(this.leaveID).subscribe(res => {
            
            this.leaveList = res;
            this.getEmployeeDetails(this.leaveList[0].EmpID);
            if(this.leaveList[0].Status =='Pending') {
                this.isPending=true;
            }
        });
        this.leaveService.getApproverListByRefID(this.leaveID).subscribe(res => {
            this.approverList=res;
        });
        
  }

  getEmployeeDetails(id:any) {
        this.leaveService.getEmployeeDetail(id).subscribe(res => {
            this.ishowLeaveDetails = true;
            this.userDetail=res;
        });
    }
     approveClicked() {
        
            if(this.comments.trim().length > 2)
            {
            var params = {
                Comments: this.comments.trim(),
                Status: 'Approved',
                LeaveRequestRefId:this.leaveID
            };
            this.leaveService.singleLeaveApprove(params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = false;
                        this.approved = true;
                        this.dismiss();
                    } else {
                        this.rejected = true;
                        this.approved = false;
                    }
                });
            }
        }
   

    rejectClicked() {

       if(this.comments.trim().length > 2)
            {
        //    BACKEND CALL HERE
            var params = {
                Comments: this.comments.trim(),
                Status: 'Rejected',
                LeaveRequestRefId:this.leaveID
            };

            this.leaveService.singleLeaveReject(params)
                .subscribe(res => {
                    if (res) {
                        this.rejected = true;
                        this.approved = false;
                        this.dismiss();
                    } else {
                        this.rejected = false;
                        this.approved = true;
                    }
                });
            }
        
    }

  dismiss()
  {
      var changedStatus:boolean = false
      if(this.approved == true || this.rejected == true)
       changedStatus = true;

      this.viewCtrl.dismiss({changedStatus:changedStatus,approved:this.approved});
  }

}



