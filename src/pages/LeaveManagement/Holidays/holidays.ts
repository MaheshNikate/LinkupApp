import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { HolidayService } from '../services/holiday.service';
import { Holiday } from '../models/holiday';
import { Spinnerservice } from '../../../shared/services/spinner';
import * as moment from 'moment/moment';

export class MyEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean = true;
}

@Component({
  selector: 'page-holidays',
  templateUrl: 'holidays.html',
  providers:[HolidayService,Spinnerservice]
})
export class Holidays {

  holidaysObs: Holiday[];
  servRows = 7;

  holidays: any;
  events: any[];

  eventDay: MyEvent;
  dialogVisible: boolean = false;

  holidayDetails: boolean = false;
  holiday: Holiday;

  holidayList: any;
  pendingHoliday: any;

  constructor(
    public navCtrl: NavController, 
    private holidayService: HolidayService,
    public spinner:Spinnerservice,
    public alertCtrl :AlertController) {
    this.holidays = [];
    this.holiday = { ID: null, HolidayDate: '', HolidayType: '', WeekDay: '', Title: '' };
    this.getHolidays();
  }
/* Get Holidays list*/
  getHolidays()
  {
    // this.holidaysObs = this.holidayService.getHolidays();
    // this.holidaysObs.subscribe();

      this.holidayList = [];
      this.pendingHoliday = [];
      this.spinner.createSpinner('Please wait..')
      this.holidayService.getHolidays().subscribe((res:any) => {
        this.spinner.stopSpinner();
        this.holidaysObs = res;
        this.holidaysObs.reverse();
          for (let i = 0; i < res.length; i++) {
          res[i].start = moment(res[i].HolidayDate);
         if ((moment(res[i].start).diff(moment(), 'days')) > -1) {
          this.pendingHoliday.push(res[i]);
        }
          }
    },
    error =>{
       this.spinner.stopSpinner();
      this.showAlert('Failed','Failed to get response from server.');
    });
  }

  showAlert(title:string, subTitle:string) {
      this.spinner.stopSpinner();
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.present();
        }
   

}
