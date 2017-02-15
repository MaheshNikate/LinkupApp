import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

/** Module Level Dependencies */
import { HolidayService } from '../services/holiday.service';
import { Holiday } from '../models/holiday';
import { Spinnerservice } from '../../../shared/services/spinner';

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

  holidaysObs: Observable<Holiday>;
  servRows = 7;

  holidays: any;
  events: any[];

  eventDay: MyEvent;
  dialogVisible: boolean = false;

  holidayDetails: boolean = false;
  holiday: Holiday;

  constructor(public navCtrl: NavController , private holidayService: HolidayService,public spinner:Spinnerservice) {
    this.holidays = [];
    this.holiday = { ID: null, HolidayDate: '', HolidayType: '', WeekDay: '', Title: '' };
    this.getHolidays();
  }
/* Get Holidays list*/
  getHolidays()
  {
    // this.holidaysObs = this.holidayService.getHolidays();
    // this.holidaysObs.subscribe();
      this.spinner.createSpinner('Please wait..')
      this.holidayService.getHolidays().subscribe((res:any) => {
        this.spinner.stopSpinner();
        this.holidaysObs = res;
    });
  }
   

}
