import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class PasswordRecoveryService {


    constructor(private http: HttpClient) {
    }

    recovery(email: string): Observable<any> {
        return this.http.post<any>('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/user/recovery', email);
    }
}