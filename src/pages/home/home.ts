import { Component,ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';


import { NavController } from 'ionic-angular';
import {ApplyForLeave} from '../LeaveManagement/ApplyForLeave/applyforleave';
import {MyLeaves} from '../LeaveManagement/MyLeaves/myleaves';
import {Holidays} from '../LeaveManagement/Holidays/holidays';
import {LeaveApproval} from '../LeaveManagement/LeaveApproval/leaveapproval';

export interface PageInterface {
  title: string;
  component: any;
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


  appPages: PageInterface[] = [];
 

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public platform: Platform,
    public events: Events,
  ) {
    
    this.isShowLeaveMgt = false;
  }

  showLeaveManagement() {
      if(this.isShowLeaveMgt == false)
      {
      this.appPages = [
          { title: 'Apply For Leave', component: ApplyForLeave },
          { title: 'My Leaves', component: MyLeaves, index: 1},
          { title: 'Holidays', component: Holidays,  index: 2 },
          { title: 'Leave Approval', component: LeaveApproval,  index: 3 }
        ];
        this.isShowLeaveMgt = true;
      }
      else
      {
        this.appPages = [];
        this.isShowLeaveMgt = false;
      }
   
  }

  openPage(page: PageInterface)
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
