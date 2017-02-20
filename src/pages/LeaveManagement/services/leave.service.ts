import { Injectable } from '@angular/core';
import { Http, Response ,Headers,RequestOptions } from '@angular/http';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../../shared/index';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import {App} from 'ionic-angular';

export const CONTEXT = 'Leave';



 @Injectable()
export class LeaveService extends BaseService {
    constructor( public http: Http) {
        super( http, CONTEXT);
    }
    /* Mobile API */

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

    //Get My leaves

    getMyLeaves(): Observable<Leave> {
        // return this.getChildList$('myleaves',0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Leave/myleaves',options).map((res => res.json()));
    }
   
   // Get Leaves to approve 

    getApproverLeaves(): Observable<Leave[]> {
        // return this.getChildList$('ApproverLeaves',0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Leave/ApproverLeaves',options).map((res => res.json()));
    }
    
    // Get Pending status leaves for bulk approval

     getLeaveByStatus(status:any): Observable<Leave[]> {
        // return this.getChildList$('ByStatus/'+status,0,0,true).map(res => res.json());
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Leave/ByStatus/Pending',options).map((res => res.json()));
    }

    // Get My applied leave details

    getLeaveDetails(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'EmployeeLeaves/GetMyLeaveDetails',options).map((res => res.json()));
    }
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
        return this.http.put(this.baseUrl+'LeaveApprovers/ApproveByManager',payload,options).map((res => res.json()));
    }

    // Bulk approval 

     bulkLeaveApproval(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl+'LeaveApprovers/BulkLeaveApproval',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Single leave approval

    singleLeaveApprove(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl+'LeaveApprovers/ApproveByManager',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    hrsingleLeaveApprove(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl+'LeaveApprovers/ApproveByHR',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Single leave Reject

    singleLeaveReject(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        // let windowRef = this._window();
        // windowRef['App'].blockUI();
        return this.http.put(this.baseUrl+'LeaveApprovers/RejectLeave',body,options)
         .map(res => {
            // windowRef['App'].unblockUI();
            return res.json();
        })
        .catch(err => {
            // windowRef['App'].unblockUI();
            return this.handleError(err);
        });
    }

    // Get approver list 

    getLeaveDetailByRefID(refId:any): Observable<Leave[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'LeaveDetails/'+refId,options)
        .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
    getApproverListByRefID(refId:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'LeaveApprovers/'+refId,options)
        .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

      getEmployeeDetail(Id:any): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Employee/'+Id,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Get active projects

    getActiveProjects(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'Project/GetMyActiveProjects',options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Submit new leave

    submitLeaveRecord(leavePayload:any): Observable<boolean> {
        let headers = new Headers();
        let body=JSON.stringify(leavePayload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Get current pending leaves

     getCurrentUserPendingLeaveCount() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+'LeaveDetails/GetCurrentUserPendingLeaveCount',options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

     checkIfAlreadyAppliedForTrainee(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails/GetCurrentUserCurrentMonthLeaveCount',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    // Cancel leave

     deleteLeaveRecord(leavePayload:any): Observable<boolean> {
        let headers = new Headers();
        let body=JSON.stringify(leavePayload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'Leave/cancel',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    checkIfAlreadyApplied(payload:any) {
        let headers = new Headers();
        let body=JSON.stringify(payload);
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+'LeaveDetails/GetAppliedLeaveForSameDate',body,options)
         .map(res => {
            return res.json();
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

   
   
  
}