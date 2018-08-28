import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Static } from 'app/static';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ShowroomIDService implements Resolve<any>
{
    showroom_id: any[];
    onDataChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onDataChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getShowroomID()
            ]).then(
                () => {
                    resolve();
                },
                reject
                );
        });
    }

    /**
     * Get showroom id
     *
     * @returns {Promise<any>}
     */
    getShowroomID(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(Static.getServerUrl() + 'showroom_id/get')
                .subscribe((response: any) => {
                    this.showroom_id = response;
                    this.onDataChanged.next(this.showroom_id);
                    resolve(response);
                }, reject);
        });
    }

    add(id: string, password: string): Observable<any> {
        var status = this._httpClient.post<any>(Static.getServerUrl() + 'showroom_id/add', { id, password });
        return status;
    }
}