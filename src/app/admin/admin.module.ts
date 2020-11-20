import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { MeatingHistoryComponent } from './meating-history/meating-history.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    MeatingHistoryComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
