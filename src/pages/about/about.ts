import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../Login/login.service';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers:[AuthService]
})
export class AboutPage {
public userDetail : any;
    constructor(public navCtrl: NavController,
    public authService:AuthService) {

        this.userDetail=this.authService.getCurrentUser();

    }

}