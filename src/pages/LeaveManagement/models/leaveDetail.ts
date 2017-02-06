import { Leave } from './leave';

export interface LeaveDetail {
    LeaveList: Leave[];
    LeaveTaken:number;
    LeaveBalance:number;
    HalfdayLeaveTaken:number;
    AbsentTaken:number;
    HalfdayAbsentTaken:number;
}
