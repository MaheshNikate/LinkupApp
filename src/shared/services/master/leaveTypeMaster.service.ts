/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/** Module Level Dependencies */
import { Select } from '../../../pages/LeaveManagement/models/select';
import { BaseService } from '../../../shared/index';
// import { Employee } from '../models/employee';

/** Context for service calls */
const CONTEXT = 'LeaveType';

/** Service Definition */
@Injectable()
export class LeaveTypeMasterService extends BaseService {

    constructor( public http: Http) {
        super( http, CONTEXT);
    }

    /**
     * getHolidays method
     * Gets array of Holiday objects
     */
    getLeaveTypes(): Observable<Select> {
        return this.getList$(0,0,true)
        .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
}
