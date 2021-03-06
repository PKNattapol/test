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
export class AuditionsService implements Resolve<any>
{
    auditions: any[];
    onAuditionsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onAuditionsChanged = new BehaviorSubject({});
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
                this.getAuditions()
            ]).then(
                () => {
                    resolve();
                },
                reject
                );
        });
    }

    /**
     * Get auditions
     *
     * @returns {Promise<any>}
     */
    getAuditions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(Static.getServerUrl() + 'audition/get')
                .subscribe((response: any) => {
                    this.auditions = response;
                    this.onAuditionsChanged.next(this.auditions);
                    resolve(response);
                }, reject);
        });
    }

    //get download list
    getDownloadLists(): Observable<any[]> {
        return this._httpClient.get<any[]>(Static.getServerUrl() + 'audition/download');
    }

    //delete
    delete(id: string, ): Observable<any> {
        return this._httpClient.post<any>(Static.getServerUrl() + 'audition/delete', id)
    }

    //export to excel
    exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    //file saver
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}