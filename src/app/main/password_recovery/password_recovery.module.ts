import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { PasswordRecoveryComponent } from './password_recovery.component';
import { AuthguardGuard } from 'app/authguard.guard'

const routes = [
    {
        path: 'password_recovery',
        logged: [AuthguardGuard],
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
    ]
})
export class PasswordRecoveryModule {
}