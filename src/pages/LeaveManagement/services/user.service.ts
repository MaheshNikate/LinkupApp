/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/** Module Level Dependencies */
import { BaseService } from '../../../shared/index';
import { User } from '../models/user';
import { LeaveDetail } from '../models/leaveDetail';

/** Context for service calls */
export const CONTEXT = 'Users';

/** Service Definition */
@Injectable()
export class UserService extends BaseService {
    constructor(public http: Http) {
        super( http, CONTEXT);
    }

    getUserDetails(): Observable<User> {
        return this.getList$().map(res => res.json());
    }

    getLeaveDetails(param:any): Observable<LeaveDetail> {
        return this.getChildList$(param).map(res => res.json());
    }
}
