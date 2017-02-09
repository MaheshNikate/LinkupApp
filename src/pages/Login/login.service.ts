import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/index';

export const CONTEXT = 'auth';

@Injectable()
export class AuthService extends BaseService {
    private authenticated = false;

    constructor(httpService: Http,private http : Http) {
        super(httpService, CONTEXT);
    }

    isAuthenticated() {
        if (localStorage.getItem('accessToken')) {
            this.authenticated = true;
            return true;
        } else {
            this.authenticated = false;
            return false;
        }
    }
    logout() {
        localStorage.clear();
        this.authenticated = false;
    }
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('loggedInUserDetails'));
    }
    // authenticate(credentials: any): Observable<any> {
    //        let headers = new Headers();
    //     let credentialString : string = 'grant_type=password&UserName='+credentials.UserName+'&Password='+credentials.Password;
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post('http://espld200:8090/api/auth/Token', credentialString, options)
    //         .map((res: Response) => { this.setToken(res); })
    //         .catch(this.handleError);
    // }
    authenticate(credentials: any): Observable<any> {
           let headers = new Headers();
        let credentialString : string = 'grant_type=password&UserName='+credentials.UserName+'&Password='+credentials.Password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://linkupmobile.eternussolutions.com/webapi/api/auth/Token', credentialString, options)
            .map((res: Response) => { this.setToken(res); })
            .catch(this.handleError);
    }
    //http://espld200:8090
    getLoggedInUserPermission() {
        //  return this.getChildList$('permissions',0, 0, true).map((res: Response) => { this.setLoggedInUserPermission(res); });
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        // let windowRef = this._window();
       
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/auth/permissions',options)
         .map((res: Response) => {
           this.setLoggedInUserPermission(res);
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
    getCurrentUserDetails() {
        //  return this.getChildList$('currentusername',0, 0, true).map((res: Response) => {
        //     this.setLoggedInUserDetail(res);
        // });

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        // let windowRef = this._window();
       
        return this.http.get('http://linkupmobile.eternussolutions.com/webapi/api/auth/currentusername',options)
         .map((res: Response) => {
           this.setLoggedInUserDetail(res);
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('accessToken', body.access_token);
        this.authenticated = true;
    }
    private setLoggedInUserPermission(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserPermission', JSON.stringify(body));
    }
    private setLoggedInUserDetail(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserDetails', body.Name);
    }
}
