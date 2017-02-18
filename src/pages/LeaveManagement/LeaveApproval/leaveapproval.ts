import { Component } from '@angular/core';

import { NavController,Alert,ItemSliding,AlertController ,PopoverController,ActionSheetController,ModalController ,Slides} from 'ionic-angular';

/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import { ViewChild } from '@angular/core';

/** Module Level Dependencies */
import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';
import { User } from '../models/user';
import { ApprovalForm } from '../models/leaveApprovalValidation';
import { MorePopoverPage } from '../../morePopover/morepopover';
import { Spinnerservice } from '../../../shared/services/spinner';
import { LeaveDetails } from '../leaveDetails/leaveDetails';
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-leaveapproval',
  templateUrl: 'leaveapproval.html',
  providers:[LeaveService,Spinnerservice]
})
export class LeaveApproval {

  @ViewChild('Slides') slides: Slides;

public isSelectall:boolean;
public isSelect:boolean;
public leavechecked: boolean;
public editMode: boolean;
public itemcolor:string;
public pageIndex:number;
public totalCount:number;
public isMoreclicked:boolean;
public activeIndex:number;
leaveID: string;
leaveObs: Observable<Leave[]>;
leavesArray:Leave[];
pages:Leave[];
slidePage:Leave[];
slidePages:any[];
selectedLeave:Leave;
selectedLeaveID:string;
userDetObs: Observable<User>;
requests: any;
servRows = 6;
model: any;
approverList:any;
validationMessage: string = '';
approved: boolean = false;
rejected: boolean = false;
leaveList:any;
selectedEmployees: any[];
comment:string = '';
totalnumberPages:number;

  constructor(public navCtrl: NavController,
  public alertCtrl: AlertController, 
  private leaveService: LeaveService,
  public spinner:Spinnerservice
  ,public popoverCtrl: PopoverController,
  public actionSheetCtrl: ActionSheetController, 
  public modalCtrl: ModalController) {

  
   
    // this.model = {
    //         comments: ''
    //     };
    //     this.pageIndex = 0;

    // this.selectedEmployees = [];
    // this.isMoreclicked = false;

    // this.getLeavesToApprove()
  }
  ionViewWillEnter()
  {
      this.model = {
            comments: ''
        };
        this.pageIndex = 0;

    this.selectedEmployees = [];
    this.slidePages = [];
    this.isMoreclicked = false;

    this.getLeavesToApprove()
  }

    showMoreMenu(event: Event) {
    let popover = this.popoverCtrl.create(MorePopoverPage,{event});
    popover.present({ ev: event });
    popover.onDidDismiss( this.getLeavetoAcceptRejcet)
  }

   presentActionSheet(leave:any,leaveID:string) {
     if(leave.Status =='Approved'|| leave.Status =='Rejected'||leave.Status =='Cancelled')
     return;
     this.isMoreclicked = true;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Leave Action',
      buttons: [
        {
          text: 'Approve',
          role: 'destructive',
          handler: () => {
          this.selectedLeaveID = leaveID;
          this.showApproveRejectPromt(true);  
          this.isMoreclicked = false;
          }
        },{
          text: 'Reject',
          handler: () => {
            this.selectedLeaveID = leaveID;
            this.showApproveRejectPromt(false);  
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

  getPages()
  {
    var numberPages:number = this.leavesArray.length;
    //var totalnumberPages:number;
    var lastpage:number ;
    while(numberPages >= 10) 
      { 
        this.totalnumberPages = numberPages / 10 ; 
        numberPages = numberPages % 10;
        break ; 
      } 
      var pagen:string =  this.totalnumberPages.toString();
      this.totalnumberPages = parseInt(pagen) + 1;
      console.log('total pages ====' + pagen);
   
      for(let index = 0; index < this.totalnumberPages; index ++ )
      {
        this.slidePage = [];
       for(let innerindex = index*10; innerindex < this.getUpperLimit((index + 1) *10); innerindex ++)
       {
          this.slidePage.push(this.leavesArray[innerindex]);
       }
       this.slidePages.push(this.slidePage);
      }
      console.log('Pages' + this.slidePages);
  }

getUpperLimit(num:number)
{
  if(this.leavesArray.length  > num )
  return num;
  else
  return this.leavesArray.length
}

slideChanged()
{
  this.activeIndex = this.slides.getActiveIndex();
}

slideToPage(index:number)
{
  if(index  == -1)
  return
  if(index == this.totalnumberPages+1)
  return;

  this.slides.slideTo(index, 500, true);
  
}
  getLeavetoAcceptRejcet(leave:any,approve:boolean)
  {
     console.log(status);
    this.selectedLeaveID = leave.data.event;
    if(this.showApproveRejectPromt)
    {
      this.showApproveRejectPromt(true);
    }
  }

  /*Get Leaves to Approve*/

  getLeavesToApprove()
  {
    this.activeIndex = 0;
     this.isSelectall = false;
     this.isSelect = false;
     this.leavechecked = false;
      this.model.comments = '';
      this.comment = '';
      this.pageIndex = 0;
    this.selectedEmployees = [];
    this.isMoreclicked = false;
     this.spinner.createSpinner('Please wait..');  
     this.leaveService.getApproverLeaves()
    .subscribe(
      (res:any) =>  {
        this.spinner.stopSpinner();
        console.log("Data from server", res); 
        //this.leaveObs = res;
        this.leavesArray =[];
        this.leavesArray = res;
        this.leavesArray.reverse();
         this.leavesArray.forEach(leave => {
          this.selectLeave(leave,false);
        });
        this.getPages();
        this.totalCount = this.leavesArray.length;
        this.showFirst();
        
      },
      error=>
      {
        this.spinner.stopSpinner();
        this.showAlert('Failed','Failed to get response from serevr.');
      });
    
  }
  getOffsetValue(pageindx:number)
  {
    if(this.leavesArray.length ==0)
    return 0;

    if(this.totalCount - pageindx >10)
    return 10;
    else if(pageindx == this.totalCount)
    {
      if(this.totalCount - pageindx > 10)
      return 10;
      else
      return this.totalCount;
    }
    else
    return this.totalCount - pageindx;
  }
  showFirst()
  {
    this.pages = [];
    this.pageIndex = 0;
    for (let index = this.pageIndex; index< this.pageIndex+this.getOffsetValue(this.pageIndex) ;index++)
        {
         this.pages.push(this.leavesArray[index]);
        }
       // this.pageIndex = this.pageIndex+this.getOffsetValue(this.pageIndex);
  }

   showPrevious()
  {
    if(this.pageIndex == 0)
    return;

    this.pages = [];
    this.pageIndex = this.pageIndex-this.getOffsetValue(this.pageIndex);
    for (let index = this.pageIndex; index< this.pageIndex+this.getOffsetValue(this.pageIndex) ;index++)
        {
         this.pages.push(this.leavesArray[index]);
        }
        if(this.pageIndex !=0)
        this.pageIndex = this.pageIndex+this.getOffsetValue(this.pageIndex);
  }
   showNext()
  {
     if(this.pageIndex == this.totalCount)
     return;

    this.pageIndex = this.pageIndex+this.getOffsetValue(this.pageIndex);
    this.pages = [];
    for (let index = this.pageIndex ; index< this.pageIndex+this.getOffsetValue(this.pageIndex) ;index++)
        {
         this.pages.push(this.leavesArray[index]);
        }
    this.pageIndex = this.pageIndex+this.getOffsetValue(this.pageIndex);
        
  }

   showLast()
  {
    this.pages = [];
    this.pageIndex = this.totalCount-this.getOffsetValue(this.pageIndex);
    for (let index = this.pageIndex; index< this.pageIndex+this.getOffsetValue(this.pageIndex) ;index++)
        {
         this.pages.push(this.leavesArray[index]);
        }
        this.pageIndex = this.pageIndex+this.getOffsetValue(this.pageIndex);
  }

   getPendingLeavesToApprove()
  {
     this.isSelectall = false;
     this.isSelect = false;
     this.leavechecked = false;
      this.model.comments = '';
      this.spinner.createSpinner('Please wait..');
     this.leaveService.getLeaveByStatus('Pending')
    .subscribe(
      (res:any) =>  {
        this.spinner.stopSpinner();
        console.log("Data from server", res); 
         
         this.leavesArray =[];
         this.leavesArray = res;
         this.leavesArray.forEach(leave => {
          this.selectLeave(leave,true);
        });
        this.totalCount = this.leavesArray.length;
        this.showFirst();

        // this.leaveObs = res;
        // this.leaveObs.forEach(leave => {
        //   this.selectLeave(leave,false);
        // });
        
      });
    
  }

  /*long press list */
  getEditMode()
  {
    this.editMode = true;
  }
/*Approve/ Reject Leaves */


approveLeave(sLeave:any , slidingItem: ItemSliding)
  {
    slidingItem.close();
    this.selectedLeave = sLeave;
    this.showApproveRejectPromt(true);
  }
  rejectLeave(sLeave:any , slidingItem: ItemSliding)
  {
    slidingItem.close();
    this.selectedLeave = sLeave;
    this.showApproveRejectPromt(false);
  }

  approveClicked() {

         
             var params = {
                LeaveRequestRefId: this.selectedLeaveID,
                Comments: this.comment,
                Status: 'Approved'
            };

            this.spinner.createSpinner('Please wait..');
            this.leaveService.singleLeaveApprove(params)
                .subscribe(res => {
                  this.spinner.stopSpinner();
                    if (res) {
                        this.rejected = false;
                        this.approved = true
                        //this.showAlert('Success!','Leave Approved');
                      //this.showToast('Leave is Approved successfully!');

                        this.getLeavesToApprove();
                    } else {
                        this.showAlert('Failed!','Request failed');
                        this.rejected = true;
                        this.approved = false;
                    }
                });
    }

    rejectClicked() {

      
           this.spinner.createSpinner('Please wait..');
           var params = {
                LeaveRequestRefId: this.selectedLeaveID,
                Comments: this.comment,
                Status: 'Rejected'
            };

            this.leaveService.singleLeaveReject(params)
                .subscribe(res => {
                  this.spinner.stopSpinner();
                    if (res) {
                        this.rejected = false;
                        this.approved = true;
                        this.showToast('Leave is Rejcted successfully!');
                        //this.showAlert('Success!','Leave Rejected');
                        this.getLeavesToApprove();
                    } else {
                        this.showAlert('Failed!','Request failed');
                        this.rejected = true;
                        this.approved = false
                    }
                });
    }

/*Selection of Leaves */

selectLeaves()
{
  if(this.isSelectall == true)
  return;
  
   this.isSelect = !this.isSelect;

   if(this.isSelect == false)
   {
      this.leavesArray.forEach(leave => {
          this.selectLeave(leave,false);
        });
         this.totalCount = this.leavesArray.length;
        this.showFirst();
   }

}

  selectAllLeaves()
  {
    this.isSelectall = !this.isSelectall;
    this.isSelect = false;
    if(this.isSelectall == true)
    {
     this.isSelectall = false;
     this.isSelect = false;
     this.leavechecked = false;
     this.model.comments = '';
      this.selectedEmployees = [];
      this.spinner.createSpinner('Please wait..');
     this.leaveService.getLeaveByStatus('Pending')
    .subscribe(
      (res:any) =>  {
        this.spinner.stopSpinner();
        console.log("Data from server", res); 

         this.leavesArray =[];
        this.leavesArray = res;
         this.leavesArray.forEach(leave => {
          this.selectLeave(leave,true);
        });
        this.totalCount = this.leavesArray.length;
        this.showFirst();
        // this.leaveObs = res;
        // this.leaveObs.forEach(leave => {
        //   this.selectLeave(leave,true);
        // });
        
      },error =>
      {
        this.spinner.stopSpinner();
        this.showAlert('Failed','Failed to get response from server.');
      });

      
      // this.leaveObs.forEach(leave => {
      //     this.selectLeave(leave,true);
      //   });
    }
    else
    {
      this.selectedEmployees = [];
      this.getLeavesToApprove();
      // this.editMode = false;
      //   this.leaveObs.forEach(leave => {
      //     this.selectLeave(leave,false);
      //   });
    }
    
  }
  // selectLeaveClicked(leave:any, slidingItem: ItemSliding , checked:boolean , index:number)
  // {
  //   slidingItem.close();
  //   this.selectLeave(leave,leave.selected);
   
  // }

  selectLeaveClicked(leave:any, checked:boolean , index:number)
  {
    this.selectLeave(leave,leave.selected);
  }
  selectLeave(leave:any ,checked:boolean)
  {
     if(checked == false)
    {
      var index : number = 0;
      this.leavesArray.forEach(leaves => {
          if(leaves == leave)
          {
            this.selectedEmployees.splice(index,1);
          }
          index ++;
        });
      leave.selectionColor = "white";
      leave.selected = false;
    }
    else
    {
      this.selectedEmployees.push(leave);
      leave.selectionColor = "#44679F";
      leave.selected = true;
    }
   this.setboolean();
  }
  setboolean()
  {
    this.leavechecked = false;
    this.isSelectall = false;
    if(this.selectedEmployees && this.selectedEmployees.length > 0)
    {
      this.leavechecked = true;

      var count : number = 0;
      this.leavesArray.forEach(leaves => {
          count ++;
        });
      if(count == this.selectedEmployees.length)
        {
          this.isSelectall = true;
        }
    }
  }
  
  
  /* Approve/Reject prompt */

  showApproveRejectPromt(approve:boolean)
  {
    var isApprove: String = "Approve";
    if(approve)
    isApprove = "Approve";
    else
    isApprove = "Reject";

let prompt = this.alertCtrl.create({
      title: 'Leave',
      message: "Enter a comment for Leave!",
      inputs: [
        {
          name: 'title',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: isApprove,
          handler: data => {
            console.log('Saved clicked');
            this.model.comments = data;
            this.comment = data.title;
            var cmt = this.comment;//this.model.comments;
            
            if(isApprove == 'Approve')
            {
            if(this.comment.trim().length == 0)
            {
              this.model.comments = '';
              this.comment = '';
              this.showApproveRejectPromt(true);
              return;
             }
              if(this.leavechecked)
              this.sendRequest('Approved');
              else
              this.approveClicked();
            }
            else
            {
              if(this.comment.trim().length == 0)
            {
              this.model.comments = '';
              this.comment = '';
              this.showApproveRejectPromt(false);
              return;
             }
              if(this.leavechecked)
              this.sendRequest('Rejected');
              else
              this.rejectClicked();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  

  /*Bulk Approval */

   approveBulkLeave()
  {
    this.showApproveRejectPromt(true);
  }

  rejectBulkLeave()
  {
    this.showApproveRejectPromt(false);
  }


  assembleReqPayload(status: string) {

    var payload:any = {
          LeaveRequestIDs:[],
          StatusAndComments:{
            Comments: this.comment,
            Status: status
          }
        };
    for (var index in this.selectedEmployees) {
      payload.LeaveRequestIDs.push(
        {
          LeaveRequestRefId: this.selectedEmployees[index].LeaveRequestMasterId,
        });
    }
    return payload;
  }
  

  sendRequest(status:any) {

    this.spinner.createSpinner('Please wait..');
    if (this.selectedEmployees.length > 0) {
        //    BACKEND CALL HERE
         this.leaveService.bulkLeaveApproval(this.assembleReqPayload(status)).subscribe(res => {
           this.spinner.stopSpinner();
            if (res) {
               this.rejected = true;
               this.approved = false;
               this.getLeavesToApprove();
               this.selectedEmployees = [];
                //this.showToast('All Leaves are' + ' ' + status + ' ' + 'successfully!');
               //this.showAlert('Success','Selected leaves are '+ status + '!');
         } else {
           this.showAlert('Failed','Action failed!');
         }
      });
      }
  }

/* Show leave details */
   showLeaveDetails(leave:any)
  {
    if(this.isMoreclicked == true || this.isSelect == true)
    return;

    let leaveDetailsModal = this.modalCtrl.create(LeaveDetails ,{ leave: leave});
     leaveDetailsModal.onDidDismiss(status => {
     if(status.changedStatus == true)
     {
       var msg :string = '';
       if(status.approved == true)
       msg = 'Leave is Approved successfully!';
       else
       msg = 'Leave is Rejected successfully!';

       //this.showToast(msg);

      this.getLeavesToApprove();
     }
     
   });
   leaveDetailsModal.present();
  }

/* Alert */
  showAlert(title:string, subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  showToast(message:string)
  {
    Toast.show(message, '5000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
  }

}
