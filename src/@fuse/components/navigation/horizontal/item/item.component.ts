import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LoginService } from 'app/main/login/login.service';

@Component({
    selector   : 'fuse-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class FuseNavHorizontalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: any;

    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _matSnackBar: MatSnackBar
    )
    {

    }

    logout()
    {
        this.loginService.setUserLoggedOut();
        this.router.navigate(['../login']);
        this._matSnackBar.open('Successful logout', 'OK', {
            verticalPosition: 'top',
            duration: 3000
        });
    }
}