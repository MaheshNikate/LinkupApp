import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { AboutPage } from '../../about/about';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';

@Component({
  selector: 'page-applyforleave',
  templateUrl: 'applyforleave.html',
  providers:[LeaveService,UserService]
})
export class ApplyForLeave {

  
  public leaveObs: Observable<Leave>;
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: any;
  public sdate:string;
  public edate:string;
  public minSdate :string;
  public minEdate :string;
  public maxSdate :string;
  public maxEdate :string;

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
      this.getMinDate();
      this.getMaxDate();
      this.sdate = new Date().toString();
      this.edate = new Date().toString();
      

  }
  getMinDate()
  {
   this.minSdate = new Date().setDate(new Date().getDate() - 60).toString();
   this.minEdate = new Date().setDate(new Date().getDate() - 60).toString();
  }
  getMaxDate()
  {
    this.minSdate = new Date().setDate(new Date().getDate() + 60).toString();
    this.minEdate = new Date().setDate(new Date().getDate() + 60).toString();
  }

  changedStartDate(e) {
    console.log(e)
  }
  changedEndDate(e) {
    console.log(e)
  }

  getLeaves()
  {
    console.log('calling leaves');
     this.leaveObs = this.leaveService.getMyLeaves();
    // this.leaveService.getMyLeaves().subscribe(
    //   (res:any) =>  {
    //     console.log("Data from server", res); 
    //     this.leaveObs = res;
    //   });
      this.leaveService.getLeaveDetails().subscribe((res:any) => {
        this.leaveDetail = res[0];
    });
    //this.leaveDetObs = this.userService.getLeaveDetails('LeaveDetails');
  }
  showMyLeaves()
  {
    this.isShowMyLeave = !this.isShowMyLeave;
  }
}
