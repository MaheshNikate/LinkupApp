import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../../shared/index';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';

export const CONTEXT = 'Leave';



 @Injectable()
export class LeaveService extends BaseService {
    constructor( public http: Http) {
        super( http, CONTEXT);
    }

     /**
     * getLeave method
     * Gets leave object corresponding to ID specified
     */
    getLeave(id:any): Observable<Leave> {
        return this.get$(id).map(res => res.json());
    }

    /**
     * getLeaves method
     * Gets array of leaves
     */
    getLeaves(): Observable<Leave> {
        return this.getList$(0,0,true).map(res => res.json());
    }
    getMyLeaves(): Observable<Leave> {
        // return this.getChildList$('myleaves',0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/Leave/myleaves',options).map((res => res.json()));
    }
    // getMyLeaves(): Observable<Leave> {
    //     // return this.getChildList$('myleaves',0,0,true).map(res => res.json());
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('/api/Leave/myleaves',options).map((res => res.json()));
    // }
    getApproverLeaves(): Observable<Leave[]> {
        // return this.getChildList$('ApproverLeaves',0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/Leave/ApproverLeaves',options).map((res => res.json()));
    }

    // getApproverLeaves(): Observable<Leave[]> {
    //     // return this.getChildList$('ApproverLeaves',0,0,true).map(res => res.json());
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('/api/Leave/ApproverLeaves',options).map((res => res.json()));
    // }
   

    //  getLeaveByStatus(status:any): Observable<Leave[]> {
    //     // return this.getChildList$('ByStatus/'+status,0,0,true).map(res => res.json());
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('/api/Leave/ByStatus/Pending',options).map((res => res.json()));
    // }

     getLeaveByStatus(status:any): Observable<Leave[]> {
        // return this.getChildList$('ByStatus/'+status,0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/Leave/ByStatus/Pending',options).map((res => res.json()));
    }

    getLeaveDetails(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/EmployeeLeaves/GetMyLeaveDetails',options).map((res => res.json()));
    }
    // getLeaveDetails(): Observable<any> {
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get('/api/EmployeeLeaves/GetMyLeaveDetails',options).map((res => res.json()));
    // }
    /**
     * 
     * getLeaveArray method
     * Gets child array in the object to be returned. List of applied leaves, in this case
     * @methodParam mandatory parameter
     */
    getLeaveArray(methodParam:any): Observable<LeaveDetail> {
        return this.getChildList$(methodParam).map(res => res.json());
    }

    /**
     * addLeaveRecord method
     * Adds leave record. returns true if successful, false if not.
     */
    addLeaveRecord(leavePayload:any): Observable<boolean> {
        return this.post$(leavePayload).map(res => res.status === 201 ? true : false);
        // api/LeaveApprovers/ApproveByManager

        // let headers = new Headers();
        // headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post('/api/LeaveApprovers/ApproveByManager',leavePayload,options).map((res => res.json()));
    }

    /**
     * getChildRecord method
     * Gets data form the path extension specified.
     * @params : Parameter : path extension
     */
    getChildRecord(params:any): Observable<any> {
        return this.getChildList$(params).map(res => res.json());
    }

    /**
     * updateLeaveRecord method
     * Put request to update a record.
     * @ID : Parameter : ID of entity to update
     * @payload : Parameter : Object with properties of entity to be updated
     */
    updateLeaveRecord(ID:any, payload:any): Observable<boolean> {
        // return this.put$(ID, payload).map(res => res.status === 200 ? true : false);
         let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.put('http://linkupmobile.eternussolutions.com/webapi/api/LeaveApprovers/ApproveByManager',payload,options).map((res => res.json()));
    }

    // bulkLeaveApproval(payload:any) {
    //     let headers = new Headers();
    //     let body=JSON.stringify(payload);
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    //     headers.append('Content-Type', 'application/json');
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.put('/api/LeaveApprovers/BulkLeaveApproval',body,options)
    //      .map(res => {
    //         return res.json();
    //     })
    //     .catch(err => {
    //         return this.handleError(err);
    //     });
    // }

     bulkLeaveApproval(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put('http://linkupmobile.eternussolutions.com/webapi/api/LeaveApprovers/BulkLeaveApproval',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    singleLeaveApprove(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // let windowRef = this._window();
        // windowRef['App'].blockUI();
        return this.http.put('http://linkupmobile.eternussolutions.com/webapi/api/LeaveApprovers/ApproveByManager',body,options)
         .map(res => {
            // windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            // windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }
    singleLeaveReject(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // let windowRef = this._window();
        // windowRef['App'].blockUI();
        return this.http.put('http://linkupmobile.eternussolutions.com/webapi/api/LeaveApprovers/RejectLeave',body,options)
         .map(res => {
            // windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            // windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }

    /**
     * deleteLeaveRecord method
     * Delete request to delete a record.
     * @ID : Parameter : ID of entity to update
     */
    deleteLeaveRecord(ID:any): Observable<boolean> {
        return this.delete$(ID).map((res) => {
            return res.status === 200 ? true : false;
        });
    }
}