import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Static } from 'app/static';

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
                this._httpClient.get(Static.getServerUrl() + 'audition/get/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.audition = response;
                        this.onAuditionChanged.next(this.audition);
                        resolve(response);
                    }, reject);
            }
        });
    }

    delete(id: string): Observable<any> {
        return this._httpClient.post<any>(Static.getServerUrl() + 'audition/delete', id);
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveAudition(audition): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(Static.getServerUrl() + 'audition/update/' + audition.id, audition)
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
            this._httpClient.post(Static.getServerUrl() + 'audition/add', audition)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    deleteImage(audition_id, image_id): Observable<any> {
        return this._httpClient.post<any>(Static.getServerUrl() + 'audition/delete_image', {audition_id,image_id});
    }
}