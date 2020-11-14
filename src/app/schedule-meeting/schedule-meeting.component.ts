import { Meeting } from './../meating.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
//import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {

  isLogin = false;
  meetings : Meeting[] = [];
  //meetingSheduled = new Subject<Meeting[]>();

  constructor(private athService : AuthService,private router : Router) { }

  submit(form : NgForm){

    console.log("Form Submited : ", form.value);
    var date = form.value.date;
    var time = form.value.time;
    var dur = form.value.dur;
    var topic = form.value.topic;
    const meeting = new Meeting(date,time,dur,topic);
    this.meetings.push(meeting);
    form.reset();
  }

  ngOnInit(): void {

    this.athService.user.subscribe(
      login => {
        this.isLogin = login;
      }
    );

    if(!this.isLogin){
      alert("Please login to schedule meeting");
      this.router.navigate(['/home']);
    }

  }

}
