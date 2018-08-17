import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Audition } from './audition.model';
import { AuditionService } from './audition.service';

@Component({
    selector     : 'audition',
    templateUrl  : './audition.component.html',
    styleUrls    : ['./audition.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuditionComponent implements OnInit, OnDestroy
{
    audition: Audition;
    pageType: string;
    auditionForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AuditionService} auditionService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private auditionService: AuditionService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    )
    {
        // Set the default
        this.audition = new Audition();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update product on changes
        this.auditionService.onAuditionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(audition => {

                if ( audition )
                {
                    this.audition = new Audition(audition);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.audition = new Audition();
                }

                this.auditionForm = this.createAuditionForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createAuditionForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.audition.id],
            name            : [this.audition.name],
            handle          : [this.audition.handle],
            description     : [this.audition.description],
            custom01        : [this.audition.custom01],
            custom02        : [this.audition.custom02],
            custom03        : [this.audition.custom03],
            image           : [this.audition.image]
        });
    }

    deleteAudition(id, name) {
        this._matSnackBar.open('Are you sure to delete ' + name, 'DELETE', {
            verticalPosition: 'top',
            duration: 10000
        }).onAction().subscribe(() => {
            this.auditionService.delete(id).subscribe(response => {
                if (response.status != 'success') {
                    this._matSnackBar.open('Delete failed', 'OK', {
                        verticalPosition: 'top',
                        duration: 3000
                    });
                    return false;
                }
                else {
                    this._matSnackBar.open('Successful delete ' + name, 'OK', {
                        verticalPosition: 'top',
                        duration: 3000
                    });
                    this.router.navigate(['../dashboard']);
                    return true;
                }
            });
        });
    }

    /**
     * Save product
     */
    saveAudition(): void
    {
        const data = this.auditionForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this.auditionService.saveAudition(data)
            .then(() => {

                // Trigger the subscription with new data
                this.auditionService.onAuditionChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Audition saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 3000
                });
            });
    }

    /**
     * Add product
     */
    addAudition(): void
    {
        const data = this.auditionForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this.auditionService.addAudition(data)
            .then(() => {

                // Trigger the subscription with new data
                this.auditionService.onAuditionChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Audition added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 3000
                });

                // Change the location with new one
                this._location.go('audition/' + this.audition.id);
            });
    }
}