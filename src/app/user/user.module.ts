import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingComponent } from './meeting/meeting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';


@NgModule({
  declarations: [
    UserComponent,
    MeetingComponent,
    MeetingEditComponent,
    ScheduleMeetingComponent,
    ScheduleStartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
