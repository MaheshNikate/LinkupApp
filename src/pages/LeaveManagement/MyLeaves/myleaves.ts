import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';

@Component({
  selector: 'page-myleaves',
  templateUrl: 'myleaves.html',
  providers:[LeaveService,UserService]
})
export class MyLeaves {

  public leaveObs: Observable<Leave>;
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetailObs: Observable<LeaveDetail>;
  servRows = 5;
  leaves: {};
  leave: any;
  public isShowMyLeave:boolean;

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService) {
      this.isShowMyLeave = false;
      this.leaves = [];
      this.getLeaves();
    
  }
  getLeaves()
  {
    console.log('calling leaves');
    this.leaveObs = this.leaveService.getLeaves();
    this.leaveDetObs = this.userService.getLeaveDetails('LeaveDetails');
  }
  showMyLeaves()
  {
    this.isShowMyLeave = !this.isShowMyLeave;
  }

}
