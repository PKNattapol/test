import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ShowroomIDComponent } from './showroom_id.component';
import { ShowroomIDService } from './showroom_id.service';
import { AuthguardGuard } from 'app/authguard.guard'

const routes: Routes = [
    {
        path: 'showroom_id',
        canActivate: [AuthguardGuard],
        component: ShowroomIDComponent,
        resolve: {
            data: ShowroomIDService
        }
    }
];

@NgModule({
    declarations: [
        ShowroomIDComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers: [
        ShowroomIDService,
        AuthguardGuard
    ]
})
export class ShowroomIDModule {
}