import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
     * Get products
     *
     * @returns {Promise<any>}
     */
    getAuditions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/test')
                .subscribe((response: any) => {
                    this.auditions = response;
                    this.onAuditionsChanged.next(this.auditions);
                    resolve(response);
                }, reject);
        });
    }

    getDownloadLists(): Observable<any[]> {
        return this._httpClient.get<any[]>('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/download');
    }

    delete(id: string, ): Observable<any> {
        return this._httpClient.post<any>('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/delete', id);
    }

    exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}