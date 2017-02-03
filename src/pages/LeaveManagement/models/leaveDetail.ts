import { Leave } from './leave';

export interface LeaveDetail {
    LeaveList: Leave[];
    NumberOfLeave: number;
    HalfDayLeave: number;
    Absent: number;
    HalfDayAbsent: number;
}
