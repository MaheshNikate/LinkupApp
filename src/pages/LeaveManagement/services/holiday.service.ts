/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http ,Response ,Headers,RequestOptions } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../../shared/index';
import { Holiday } from '../models/holiday';
// import { Employee } from '../models/employee';

/** Context for service calls */
export const CONTEXT = 'Holiday';

/** Service Definition */
@Injectable()
export class HolidayService extends BaseService {

    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    // getHolidays(): Observable<Holiday> {
    //     // return this.getList$().map(res=> res.json());
    //       let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('http://espld200:8090/api/Holiday',options).map((res => res.json()));
    // }
    getHolidays(): Observable<Holiday> {
        // return this.getList$().map(res=> res.json());
          let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/Holiday',options).map((res => res.json()));
    }
}
