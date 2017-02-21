import { Component,ViewChild } from '@angular/core';
import { App, Events, MenuController, Nav, Platform } from 'ionic-angular';


import { NavController } from 'ionic-angular';
import {ApplyForLeave} from '../LeaveManagement/ApplyForLeave/applyforleave';
import {MyLeaves} from '../LeaveManagement/MyLeaves/myleaves';
import {Holidays} from '../LeaveManagement/Holidays/holidays';
import {LeaveApproval} from '../LeaveManagement/LeaveApproval/leaveapproval';
import {ProfilePage} from '../profile/profile';
import { LoginPage } from '../Login/login';

export interface PageInterface {
  title: string;
  component: any;
  permission:boolean;
  logsOut?: boolean;
  index?: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  public isShowLeaveMgt : boolean;
  public isShowTimesheet : boolean;
  public userdetails : any;
  public userPermissions : any [];

   leavePages: PageInterface[] = [];
   timesheetPages: PageInterface[] = [];
 

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public menu: MenuController,
    public platform: Platform,
    public events: Events,
  ) {
    
    this.isShowLeaveMgt = false;
    this.isShowTimesheet = false;
    this.userdetails = JSON.parse(localStorage.getItem('loggedInUserDetails'));
    this.userPermissions = JSON.parse(localStorage.getItem("loggedInUserPermission"));
    // console.log('calling profile' + this.userdetails);
  }

  ionViewDidLoad() { 
    this.nav.setRoot(MyLeaves);
    }

  openProfile(){
    console.log('calling profile');
    this.nav.setRoot(ProfilePage);
  }
  

  showLeaveManagement() {
      if(this.isShowLeaveMgt == false)
      {
      this.leavePages = [
          { title: 'Holidays', component: Holidays, permission:this.getPermission(['LEAVE.HOLIDAY.READ']), index: 2 },
          { title: 'My Leaves', component: MyLeaves,permission:this.getPermission(['LEAVE.MY_LEAVE.READ','LEAVE.MY_LEAVE.MANAGE',]), index: 1 },
          { title: 'Apply For Leave', component: ApplyForLeave, permission:this.getPermission([ 'LEAVE.APPLYFORLEAVE.READ','LEAVE.APPLYFORLEAVE.ADD','LEAVE.APPLYFORLEAVE.UPDATE','LEAVE.APPLYFORLEAVE.DELETE'])},
          { title: 'Leave Approval', component: LeaveApproval,permission:this.getPermission(['LEAVE.APPROVAL.MANAGE','LEAVE.APPROVAL.READ','LEAVE.APPROVAL.UPDATE']),  index: 3 }
        ];
        this.isShowLeaveMgt = true;
      }
      else
      {
        this.leavePages = [];
        this.isShowLeaveMgt = false;
      }
   
  }

  getPermission(feature:string[])
  {
    for(let index  = 0 ; index < feature.length; index ++ )
    {
       for(let innerindex  = 0 ; innerindex < this.userPermissions.length; innerindex ++ )
      {
        if(feature[index] == this.userPermissions[innerindex])
        {
          return true;
        }
      }
    }
    return false;
  }



  // showTimesheet() {
  //     if(this.isShowTimesheet == false)
  //     {
  //     this.timesheetPages = [
  //         { title: 'My Timesheets', component: ApplyForLeave },
  //         { title: 'Enter Timesheets', component: MyLeaves, index: 1},
  //         { title: 'Approve Timesheets', component: Holidays,  index: 2 },
  //         { title: 'Approved Timesheets', component: LeaveApproval,  index: 3 },
  //         { title: 'Timesheet Report', component: LeaveApproval,  index: 3 }
  //       ];
  //       this.isShowTimesheet = true;
  //     }
  //     else
  //     {
  //       this.timesheetPages = [];
  //       this.isShowTimesheet = false;
  //     }
   
  // }

  openPage(page: PageInterface)
  {
    if(page.permission)
    {
    if (page.index) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }
    }
    }

    logout()
    {
      localStorage.clear();
      this.appCtrl.getRootNav().setRoot(LoginPage);
    }
  

}
