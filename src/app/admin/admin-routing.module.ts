import { AdminComponent } from './admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MeatingHistoryComponent } from './meating-history/meating-history.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: DashbordComponent },
      { path: 'meeting-history', component: MeatingHistoryComponent },
      { path: 'user-management', component: UserManagementComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
