import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/Login/login';
import {ApplyForLeave} from '../pages/LeaveManagement/ApplyForLeave/applyforleave';
import {MyLeaves} from '../pages/LeaveManagement/MyLeaves/myleaves';
import {Holidays} from '../pages/LeaveManagement/Holidays/holidays';
import {LeaveApproval} from '../pages/LeaveManagement/LeaveApproval/leaveapproval';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ApplyForLeave,
    MyLeaves,
    Holidays,
    LeaveApproval
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ApplyForLeave,
    MyLeaves,
    Holidays,
    LeaveApproval
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
