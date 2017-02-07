import { User } from './user';
import { LeaveType } from './leaveType';

export interface Leave {
    ID: number;
    User: User;
    Type: LeaveType;
    StartDate: Date;
    EndDate: Date;
    NumberOfLeave: number;
    Status: string;
    Reason: string;
    Comment: string;
    selected : boolean ;
    selectionColor : string;
    Approvers: [
        {
            Project: string,
            Manager: string,
            Status: string,
            Comment: string
        }
    ];
}
