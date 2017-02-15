import { Component ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import {App, NavController ,Nav ,LoadingController ,AlertController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AuthService } from './login.service';
import { Spinnerservice } from '../../shared/services/spinner';

// import { SignupPage } from '../signup/signup';
// import { TabsPage } from '../tabs/tabs';
// import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers:[AuthService,Spinnerservice]
})
export class LoginPage {
    @ViewChild(Nav) nav: Nav;
  
  login: {username?: string, password?: string} = {};
  submitted = false;
  public errorMessage: string;
  showError: boolean = false;
  public model: User;
  

  constructor(public appCtrl: App,public navCtrl: NavController , private authService: AuthService ,
  public loading: LoadingController , public alertCtrl: AlertController, public spinner:Spinnerservice) { 
     this.model = new User('', '');
      
     //this.initializeApp();
  }
  

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.spinner.createSpinner('Please wait..');
       this.authService.authenticate(this.model)
            .subscribe(
               
            results => {
                
                this.getLoggedInUserPermission();
            },
            error => { 
                this.spinner.stopSpinner();
                this.showAlert('Failed','Failed to login!');
                this.showError = true;
                this.errorMessage = error.message;
            });
   }
  }

  getLoggedInUserPermission(): void {
        this.authService.getLoggedInUserPermission()
            .subscribe(
            results => {
                this.getCurrentUserDetails();
            },
            error => {
                this.showAlert('Failed','Failed to get user permissions!');
                this.spinner.stopSpinner();
                this.showError = true;
                this.errorMessage = error.message;
            });
    }
     getCurrentUserDetails(): void {
        this.authService.getCurrentUserDetails()
            .subscribe(
            results => {
               this.spinner.stopSpinner();
                // this.navCtrl.push(HomePage);
                this.appCtrl.getRootNav().setRoot(HomePage);
            },
            error => {
                 this.showAlert('Failed','Failed to get user details!');
                this.spinner.stopSpinner();
                this.showError = true;
                this.errorMessage = error.message;
            });
    }
    initializeApp() {
      if (localStorage.getItem('accessToken')) {
             this.navCtrl.push(HomePage);
            //this.appCtrl.getRootNav().setRoot(LoginPage);
        } 
  }

        createLoading()
        {
            let loading = this.loading.create({
            content: 'Please wait...'
            });
            loading.present();
            return loading;
        }

         showAlert(title:string, subTitle:string) {
            let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
            });
            alert.present();
        }

}




class User {
    constructor(
        public Password: string,
        public UserName: string
    ) { }
}
