/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http ,Response ,Headers,RequestOptions } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../../shared/index';
import { Holiday } from '../models/holiday';
import {App,Events} from 'ionic-angular';
// import { Employee } from '../models/employee';

/** Context for service calls */
export const CONTEXT = 'Holiday';

/** Service Definition */
@Injectable()
export class HolidayService extends BaseService {

    constructor(public http: Http ,public unAuthorizedEvent:Events) {
        super( http, CONTEXT,unAuthorizedEvent);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    /* Browser API */

    //  getHolidays(): Observable<Holiday> {
    //     // return this.getList$().map(res=> res.json());
    //       let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('/api/Holiday',options).map((res => res.json()));
    // }

     getHolidayByFinancialYear(id:string) {
        return this
            .get$(id,true)
            // .map(res => res.json());
              .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
   
    /* Mobile API */

    getHolidays(): Observable<Holiday> {
        // return this.getList$().map(res=> res.json());
          let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Holiday/2016',options)
        //.map((res => res.json()));
          .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
}
