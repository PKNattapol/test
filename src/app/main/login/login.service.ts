import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Static } from 'app/static';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {
    }
    setUserLoggedIn() {
        localStorage.setItem('_', btoa('useralreadylogin'));
    }

    setUserLoggedOut() {
        localStorage.clear();
    }

    getUserLoggedIn() {
        if (atob(localStorage.getItem('_')) == 'useralreadylogin')
            return true;
        else
            return false;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(Static.getServerUrl() + "user/login", { username, password });
    }
}