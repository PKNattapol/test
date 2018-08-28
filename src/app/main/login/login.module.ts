import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import { AuthguardGuard2 } from 'app/authguard2.guard'

const routes = [
    {
        path: 'login',
        canActivate: [AuthguardGuard2],
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,

        FuseSharedModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        AuthguardGuard2
    ]
})
export class LoginModule {
}