import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/index';

export const CONTEXT = 'Auth';

@Injectable()
export class AuthService extends BaseService {
    private authenticated = false;

    constructor(httpService: Http) {
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
    authenticate(credentials: any): Observable<any> {
        return this.post$(credentials).map((res: Response) => { this.setToken(res); });
    }
    getLoggedInUserPermission() {
        return this.getList$(0, 0, true).map((res: Response) => { this.setLoggedInUserPermission(res); });
    }

    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('accessToken', body.token);
        this.authenticated = true;
    }
    private setLoggedInUserPermission(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserPermission', JSON.stringify(body));
    }
}
