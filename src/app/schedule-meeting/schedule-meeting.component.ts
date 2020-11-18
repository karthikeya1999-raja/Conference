import { Meeting } from './../meating.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {

  isLogin = false;
  userEmail : string;
  scheduling = true;
  meetings : {meeting:Meeting,email:string,id:string,status?:string}[] = [];

  constructor(private athService : AuthService,private router : Router,private sservise : StorageService) { }

  function(){
    this.scheduling = !this.scheduling;
  }

  toNumberArray(arr: string[]) {
    var numArray: number[] = [];
    for (const key of arr) {
      numArray.push(parseInt(key, 10));
    }
    return numArray;
  }

  submit(form : NgForm){

    console.log("Form Submited : ", form.value);
    var date = form.value.date;
    var time = form.value.time;
    var dur = form.value.duration;
    var topic = form.value.topic;
    const meeting = new Meeting(date,time,dur,topic);
    this.sservise.storeUserSchedule(meeting,this.userEmail);
    form.reset();
    this.getMyScheduleInfo();
  }

  getMyScheduleInfo(){
    this.sservise.getUserSchedule().subscribe(meetings => {
      for (const key of meetings) {
        if(key.email = this.userEmail){
          this.meetings.push(key);
       }
      }
      for (const key of this.meetings) {
        const date = this.toNumberArray(key.meeting.mdate.split("-"));
        const time = this.toNumberArray(key.meeting.time.split(":"));
        const dur = this.toNumberArray(key.meeting.duration.split(":"));
        const msDate = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);
        const meDate = new Date(date[0], date[1] - 1, date[2], time[0] + dur[0], time[1] + dur[1]);
        const tDate = new Date();
        if (tDate < msDate) {
          key.status = "Yet to Start";
        } else if (tDate < meDate && tDate > msDate) {
          key.status = "On Going";
        } else {
          key.status = "Ended";
        }
      }
    });
  }

  ngOnInit(): void {

    this.userEmail = this.athService.getEmail();
    this.getMyScheduleInfo();

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
