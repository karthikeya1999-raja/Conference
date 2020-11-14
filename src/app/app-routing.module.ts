import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MeatingHistoryComponent } from './meating-history/meating-history.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'management', component: UserManagementComponent},
  { path: 'history', component: MeatingHistoryComponent},
  { path: 'dashboard', component: DashbordComponent},
  { path: 'schedule-meeting',component: ScheduleMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
