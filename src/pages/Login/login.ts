import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AuthService } from './login.service';

// import { SignupPage } from '../signup/signup';
// import { TabsPage } from '../tabs/tabs';
// import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers:[AuthService]
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  public errorMessage: string;
  showError: boolean = false;
  public model: User;

  constructor(public navCtrl: NavController , private authService: AuthService) { 
     this.model = new User('', '');
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.login(this.login.username);
      //this.navCtrl.push(HomePage);

       this.authService.authenticate(this.model)
            .subscribe(
            results => {
                this.getLoggedInUserPermission();
            },
            error => {
                this.showError = true;
                this.errorMessage = error.message;
            });
   }
  }

  getLoggedInUserPermission(): void {
        this.authService.getLoggedInUserPermission()
            .subscribe(
            results => {
                //this._router.navigate(['/']);
                this.navCtrl.push(HomePage);
            },
            error => {
                this.showError = true;
                this.errorMessage = error.message;
            });
    }
}

class User {
    constructor(
        public Password: string,
        public UserName: string
    ) { }
}
