import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';

 @Injectable()
export class Spinnerservice {
    public loader :any;
    constructor( public loading: LoadingController) {
        
    }
    createSpinner(msg:string)
    {
      this.loader = this.loading.create({
            content: msg
            });
            this.loader.present();
    }
    stopSpinner()
    {
        this.loader.dismiss();
    }
}