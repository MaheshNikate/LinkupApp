import { Component } from '@angular/core';

import { NavController,ModalController ,AlertController} from 'ionic-angular';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';

import { LeaveService } from '../services/leave.service';
import { UserService } from '../services/user.service';
import { Leave } from '../models/leave';
import { LeaveDetail } from '../models/leaveDetail';
import { LeaveDetails } from '../leaveDetails/leaveDetails';
import { Spinnerservice } from '../../../shared/services/spinner';

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

  constructor(public navCtrl: NavController , 
  private leaveService: LeaveService,
    private userService: UserService, 
    public spinner:Spinnerservice,
    public modalCtrl: ModalController,
    public alertCtrl:AlertController) {
      this.isShowMyLeave = false;
      this.leaves = [];
      this.getLeaves();
    
  }
  getLeaves()
  {
    this.spinner.createSpinner('Please wait..');
    console.log('calling leaves');
     //this.leaveObs = this.leaveService.getMyLeaves();

      this.leaveService.getMyLeaves().subscribe((res:any) => {
        this.leaveObs  = res;
        this.leaveObs.reverse();
    },
    error =>{
                
          this.showAlert('Failed','Failed to get response from server.');
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
  //   let leaveDetailsModal = this.modalCtrl.create(LeaveDetails,{leave:leave});
  //  leaveDetailsModal.present();
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
