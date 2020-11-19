import { MeetingService } from './../meeting.service';
import { Meeting } from './../meating.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private athService : AuthService,
    private route : ActivatedRoute,
    private router : Router,
    private mtService : MeetingService) { }

  function(){
    this.scheduling = !this.scheduling;
    this.mtService.getMyScheduleInfo();
  }

  editSchedule(index : number){
     this.router.navigate(['../'+index+'/edit-meeting'],{relativeTo: this.route});
  }

  submit(form : NgForm){

    console.log("Form Submited : ", form.value);
    var date = form.value.date;
    var time = form.value.time;
    var dur = form.value.duration;
    var topic = form.value.topic;
    const meeting = new Meeting(date,time,dur,topic);
    this.mtService.newMeeting(meeting,this.userEmail).subscribe(response => {
      alert("Your Meeting Stored");
      console.log(response);
      this.router.navigate(['schedule-meeting']);
    });
    form.reset();
  }

  ngOnInit(): void {
    this.mtService.meetingsChanged.subscribe(meetings => {
      this.meetings = meetings;
    });

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
