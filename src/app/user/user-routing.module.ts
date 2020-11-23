import { MeetingComponent } from './meeting/meeting.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', component: UserComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'meeting', component: MeetingComponent}
    ]},
  { path: 'schedule-meeting', component: ScheduleStartComponent,
    children: [
      { path: '', component: ScheduleMeetingComponent },
      { path: ':id/edit-meeting', component: MeetingEditComponent },
      { path: ':id/start-meeting', component: MeetingComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
