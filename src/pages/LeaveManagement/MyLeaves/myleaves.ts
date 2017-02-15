import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import { Spinnerservice } from '../../../shared/services/spinner';

@Component({
  selector: 'page-myleaves',
  templateUrl: 'myleaves.html',
  providers:[LeaveService,UserService,Spinnerservice]
})
export class MyLeaves {

  public leaveObs: Observable<Leave>;
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: any;
  servRows = 5;
  leaves: {};
  leave: any;
  public isShowMyLeave:boolean;

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService , public spinner:Spinnerservice) {
      this.isShowMyLeave = false;
      this.leaves = [];
      this.getLeaves();
    
  }
  getLeaves()
  {
    this.spinner.createSpinner('Please wait..');
    console.log('calling leaves');
     this.leaveObs = this.leaveService.getMyLeaves();
      this.leaveService.getLeaveDetails().subscribe((res:any) => {
        this.spinner.stopSpinner();
        this.leaveDetail = res;
        this.isShowMyLeave = true;
    });
  }
  showMyLeaves()
  {
    this.isShowMyLeave = !this.isShowMyLeave;
  }

}
