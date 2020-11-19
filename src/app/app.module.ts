import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeadComponent } from './head/head.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MeatingHistoryComponent } from './meating-history/meating-history.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeadComponent,
    HomeComponent,
    DashbordComponent,
    MeatingHistoryComponent,
    UserManagementComponent,
    ScheduleMeetingComponent,
    MeetingComponent,
    MeetingEditComponent,
    ScheduleStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
