;import { MeetingService } from './../../meeting.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  meetingId : string;
  @ViewChild('video') video ;
  name : string;

  constructor(private router : Router,
    private mtService : MeetingService,
    ){ }

  newMeeting(){
    this.router.navigate(['/user/meeting']);
  }

  joinMeeting(){

    console.log(this.meetingId);
    document.getElementById('video').style.display = "block";
    document.getElementById('home').style.display = "none";
    this.mtService.joinMeeting(this.meetingId,this.video,true);
  }

  scheduleMeeting(){
    this.router.navigate(['/schedule-meeting']);
  }

  ngOnInit(): void {
  }

}
