import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
        return this.getList$().map(res => res.json());
    }

    /**
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
        return this.put$(ID, payload).map(res => res.status === 200 ? true : false);
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