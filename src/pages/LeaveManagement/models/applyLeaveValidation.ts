import { Select } from './select';
export interface ApplyLeaveValidation {
    User: { ID: number, Name: string };
    numDays: number;
    leaveType: Select;
    end: any;
    start: any;
    reason: string;
}