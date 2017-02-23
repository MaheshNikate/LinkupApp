import { Component } from '@angular/core';

import { NavController,ModalController ,AlertController,ActionSheetController,Events} from 'ionic-angular';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import { MyLeaveDetails } from '../myLeaveDetails/myLeaveDetails';
import { Spinnerservice } from '../../../shared/services/spinner';
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-myleaves',
  templateUrl: 'myleaves.html',
  providers:[LeaveService,UserService,Spinnerservice]
})
export class MyLeaves {

  public leaveObs: Leave[];
  public leaveDetObs: Observable<LeaveDetail>;
  public leaveDetail: any;
  servRows = 5;
  leaves: {};
  leave: any;
  public isShowMyLeave:boolean;
  selectedLeave:any;
  leaveID: any;
  isMoreclicked:boolean;
  selectedLeaveID:string;

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService, 
    public spinner:Spinnerservice,
    public modalCtrl: ModalController,
    public alertCtrl:AlertController,
    public actionSheetCtrl:ActionSheetController,
    public testevent:Events) {
   
      this.getLeaves();
    
  }
  getLeaves()
  {
      this.isShowMyLeave = false;
      this.isMoreclicked = false;
      this.leaves = [];
    this.spinner.createSpinner('Please wait..');
    console.log('calling leaves');
     //this.leaveObs = this.leaveService.getMyLeaves();

      this.leaveService.getMyLeaves().subscribe((res:any) => {
        this.leaveObs  = res;
       // this.testevent.publish('Test',leaveID);
        this.leaveObs.reverse();
    },
    error =>{
      this.spinner.stopSpinner();
          this.showToast('Failed to get response from server');      
          //this.showAlert('Failed','Failed to get response from server.');
        });
     
      this.leaveService.getLeaveDetails().subscribe((res:any) => {
        this.spinner.stopSpinner();
        this.leaveDetail = res;
        this.isShowMyLeave = true;
    },
     error =>{
          //this.showAlert('Failed','Failed to get response');
        });
  }
  showMyLeaves()
  {
    this.isShowMyLeave = !this.isShowMyLeave;
  }
  
  showLeaveDetails(leave:any)
  {
    if(this.isMoreclicked == true)
    return;

    let myleaveDetailsModal = this.modalCtrl.create(MyLeaveDetails ,{ leave: leave});
     myleaveDetailsModal.onDidDismiss(status => {
     if(status.changedStatus == true)
     {
       this.showToast('Leave is cancelled successfully!');
       this.getLeaves();
     }
   });
   myleaveDetailsModal.present();
  }

  cancelClicked(leavID:string) {
        let leaveTobeCancelled= {
            Status: 'Cancelled',
            LeaveRequestMasterId: leavID,
            ID: this.selectedLeave.ID
        };
        this.leaveService.deleteLeaveRecord(leaveTobeCancelled).subscribe((res:any) => {
            if (res) {
              this.showToast(res.Message);
              this.getLeaves();
               // this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Leave application deleted!' });
               // this.closeClicked();
            } else {
                //this.messageService.addMessage({ severity: 'error', summary: 'Fail', detail: 'Request not completed.' });
            }
        },
        error=>
        {
          this.showToast('Failed to cancel leave.');
        });
    }

     presentActionSheet(leave:any,leaveID:string) {
     if(leave.Status =='Approved'|| leave.Status =='Rejected'||leave.Status =='Cancelled')
     return;
     this.isMoreclicked = true;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Leave Action',
      buttons: [
        {
          text: 'Cancel Leave',
          role: 'destructive',
          handler: () => {
          this.selectedLeaveID = leaveID;
          this.selectedLeave = leave;
          this.showConfirm();  
          this.isMoreclicked = false;
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.isMoreclicked = false;
          }
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Leave',
      message: 'Do you want to cancel selected leave?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            console.log('Agree clicked');
            this.cancelClicked(this.selectedLeaveID);
          }
        }
      ]
    });
    confirm.present();
  }


    showToast(message:string)
  {
//     Toast.show(message, '5000', 'center').subscribe(
//   toast => {
//     console.log(toast);
//   }
// );
  }
    

    showAlert(title:string, subTitle:string) {
      this.spinner.stopSpinner();
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.present();
        }

}
