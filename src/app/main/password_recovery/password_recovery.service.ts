import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Static } from 'app/static';

@Injectable()
export class PasswordRecoveryService {

    constructor(private http: HttpClient) {
    }

    recovery(email: string): Observable<any> {
        return this.http.post<any>(Static.getServerUrl() + 'user/recovery', email);
    }
}