import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { PasswordRecoveryComponent } from './password_recovery.component';
import { AuthguardGuard2 } from 'app/authguard2.guard'

const routes = [
    {
        path: 'password_recovery',
        canActivate: [AuthguardGuard2],
        component: PasswordRecoveryComponent
    }
];

@NgModule({
    declarations: [
        PasswordRecoveryComponent
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
        PasswordRecoveryComponent
    ],
    providers: [
        AuthguardGuard2
    ]
})
export class PasswordRecoveryModule {
}