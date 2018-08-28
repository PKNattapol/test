import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { PasswordRecoveryService } from './password_recovery.service';

@Component({
    selector: 'password_recovery',
    templateUrl: './password_recovery.component.html',
    styleUrls: ['./password_recovery.component.scss'],
    animations: fuseAnimations,
    providers: [PasswordRecoveryService]
})
export class PasswordRecoveryComponent implements OnInit {
    passwordRecoveryForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} router
     * @param {PasswordRecoveryService} passwordRecoveryService
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private passwordRecoveryService: PasswordRecoveryService,
        private _matSnackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.passwordRecoveryForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    //recovery function
    recovery() {
        this.passwordRecoveryService.recovery(this.passwordRecoveryForm.get('email').value).subscribe(response => {
            if (response.status != 'success') {
                this._matSnackBar.open('Incorrect email', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
                return false;
            }
            else {
                this._matSnackBar.open('Please check your email for reset link', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
                this.router.navigate(['../login']);
            }
        });
    }
}