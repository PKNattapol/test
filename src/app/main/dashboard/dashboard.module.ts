import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { AuditionsComponent } from './auditions/auditions.component';
import { AuditionsService } from './auditions/auditions.service';
import { AuditionComponent } from './audition/audition.component';
import { AuditionService } from './audition/audition.service';
import { AuthguardGuard } from 'app/authguard.guard'

const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [AuthguardGuard],
        component: AuditionsComponent,
        resolve: {
            data: AuditionsService
        }
    },
    {
        path     : 'audition/:id',
        canActivate: [AuthguardGuard],
        component: AuditionComponent,
        resolve  : {
            data: AuditionService
        }
    }
];

@NgModule({
    declarations: [
        AuditionsComponent,
        AuditionComponent
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
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers: [
        AuditionsService,
        AuditionService,
        AuthguardGuard
    ]
})
export class DashboardModule {
}