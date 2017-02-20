import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {
    public static LEAVE_APPROVED='Leave approved';
    public static REQUEST_FAILED='Request not completed';
    public static LEAVE_REJECTED='Leave Rejected';
    public static SESSION_TIMEOUT='Session TimeOut. Please Login';
    public static APPLY_LEAVE_1='Your leave comes in between the financial year process. You cant proceed';
    public static APPLY_LEAVE_2='Leave applied';
    public static APPLY_LEAVE_3='No more leaves available.';
    public static APPLY_LEAVE_4='No more leaves available. There are already pending leaves';
    public static APPLY_LEAVE_5='No more marriage leaves available.';
    public static APPLY_LEAVE_6='No more marriage leaves available. There are already pending Marriage leaves';
    public static APPLY_LEAVE_7='No more paternity leaves available.';
    public static APPLY_LEAVE_8='No more paternity leaves available. There are already pending paternity leaves';
    public static APPLY_LEAVE_9='No more maternity leaves available.';
    public static APPLY_LEAVE_10='No more maternity leaves available. There are already pending maternity leaves';
    public static APPLY_LEAVE_11= 'You can take only one leave in this month! No more leaves available';
    public static APPLY_LEAVE_12= 'You can take only one half day leave in this month! No more leaves available';
    public static APPLY_LEAVE_13= 'You have already applied Leave for selected date';

    isSessionTimeout:boolean=false;

    onMessageAdd: EventEmitter<Object> = new EventEmitter<Object>();

    getMessages() {
        return this.onMessageAdd;
    }

    addMessage(value: Object) {
        this.onMessageAdd.emit(value);
    }
    setSessionTimeOutMessage(value:boolean) {
        this.isSessionTimeout = value;
    }
}
