import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} router
     * @param {LoginService} loginService
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
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
        this.loginForm = this._formBuilder.group(
            {
                username: ['', Validators.required],
                password: ['', Validators.required]
            });
    }

    //login function
    login(formDirective: any) {
        this.loginService.setUserLoggedIn();
        this.router.navigate(['../dashboard']);
        /*
        var username = this.loginForm.get('username').value;
        this.loginService.login(username, this.loginForm.get('password').value).subscribe(response => {
            if (response.status != 'success') {
                this._matSnackBar.open('Incorrect username or password', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
                formDirective.resetForm();
                this.loginForm.get('username').setValue(username);
                return false;
            }
            else {
                this.loginService.setUserLoggedIn();
                this.router.navigate(['../dashboard']);
                this._matSnackBar.open('Successful login', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
            }
        });
        */
    }
}