import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ScrollableTabs } from '../shared/components/scrollable-tabs';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/Login/login';
import { ApplyForLeave } from '../pages/LeaveManagement/ApplyForLeave/applyforleave';
import { MyLeaves } from '../pages/LeaveManagement/MyLeaves/myleaves';
import { LeaveDetails } from '../pages/LeaveManagement/leaveDetails/leaveDetails';
import { MyLeaveDetails } from '../pages/LeaveManagement/myLeaveDetails/myLeaveDetails';
import { Holidays } from '../pages/LeaveManagement/Holidays/holidays';
import { LeaveApproval } from '../pages/LeaveManagement/LeaveApproval/leaveapproval';
import { ProfilePage } from '../pages/profile/profile';
import { TimesheetPage } from '../pages/timesheet/timesheet';
import { MorePopoverPage } from '../pages/morePopover/morepopover';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    ApplyForLeave,
    MyLeaves,
    Holidays,
    LeaveApproval,
    ProfilePage,
    ScrollableTabs,
    MorePopoverPage,
    TimesheetPage,
    LeaveDetails,
    MyLeaveDetails
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    ApplyForLeave,
    MyLeaves,
    Holidays,
    LeaveApproval,
    ProfilePage,
    MorePopoverPage,
    TimesheetPage,
    LeaveDetails,
    MyLeaveDetails
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
