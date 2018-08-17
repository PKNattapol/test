import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuditionService implements Resolve<any>
{
    routeParams: any;
    audition: any;
    onAuditionChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onAuditionChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAudition()
            ]).then(
                () => {
                    resolve();
                },
                reject
                );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getAudition(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onAuditionChanged.next(false);
                resolve(false);
            }
            else {
                this._httpClient.get('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/get/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.audition = response;
                        this.onAuditionChanged.next(this.audition);
                        resolve(response);
                    }, reject);
            }
        });
    }

    delete(id: string, ): Observable<any> {
        return this._httpClient.post<any>('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/delete', id);
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveAudition(audition): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/update/' + audition.id, audition)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addAudition(audition): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('https://ac6bae7e-313f-40a1-91b6-de496f974fc2.mock.pstmn.io/audition/add', audition)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}