import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ShowroomIDService } from './showroom_id.service';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
    selector: 'showroom_id',
    templateUrl: './showroom_id.component.html',
    styleUrls: ['./showroom_id.component.scss'],
    animations: fuseAnimations
})
export class ShowroomIDComponent implements OnInit {
    showroomIDForm: FormGroup;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private showroomIDService: ShowroomIDService,
        private _matSnackBar: MatSnackBar,
        private router: Router,
        private _formBuilder: FormBuilder
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.showroomIDForm = this._formBuilder.group(
            {
                showroom_id: ['', Validators.required],
                password: ['', Validators.required]
            });

        this.dataSource = new FilesDataSource(this.showroomIDService, this.paginator, this.sort);
    }
    
    //add function
    add(formDirective: any) {
        this._matSnackBar.open('Successful add ' + this.showroomIDForm.get('showroom_id').value, 'OK', {
            verticalPosition: 'top',
            duration: 3000
        });
        formDirective.resetForm();
        /*
        this.showroomIDService.add(this.showroomIDForm.get('showroom_id').value, this.showroomIDForm.get('password').value).subscribe(response => {
            if (response.status != 'success') {
                this._matSnackBar.open('Failed to add, duplicate ShowroomID', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
                return false;
            }
            else {
                this._matSnackBar.open('Successful add ' + this.showroomIDForm.get('showroom_id').value, 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
                formDirective.resetForm();
            }
        });
        */
    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {ShowroomIDService} showroomIDService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private showroomIDService: ShowroomIDService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this.showroomIDService.showroom_id;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.showroomIDService.onDataChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
            map(() => {
                let data = this.showroomIDService.showroom_id.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            }
            ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}