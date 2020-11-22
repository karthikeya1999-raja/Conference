import  Peer  from 'peerjs';
import { AuthService } from './../../auth/auth.service';
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
  @ViewChild('mvideo') mvideo;
  @ViewChild('rvideo') rvideo;
  name : string;
  isLogin = false;

  constructor(private router : Router,
    private mtService : MeetingService,
    private atService : AuthService
    ){ }

  newMeeting(){
    this.router.navigate(['/user/meeting']);
  }

  changeVideo(){
    this.mtService.changeVideo();
  }

  changeAudio(){
    this.mtService.changeAudio();
  }

  end(){
    if (confirm("Sure to leave Meeting !?")){
      if(this.isLogin){
        this.router.navigate(['/user']);
      }else{
        this.router.navigate(['/home']);
      }
    }
  }


  joinMeeting(){

    console.log(this.meetingId);
    document.getElementById('mvideo').style.display = "block";
    document.getElementById('rvideo').style.display = "block";
    document.getElementById('btn1').style.display = "inline-block";
    document.getElementById('btn2').style.display = "inline-block";
    document.getElementById('btn3').style.display = "inline-block";
    document.getElementById('home').style.display = "none";
    this.mtService.joinMeeting(this.meetingId,this.mvideo,this.rvideo);
  }

  scheduleMeeting(){
    this.router.navigate(['/schedule-meeting']);
  }

  ngOnInit(): void {

    this.atService.user.subscribe(login => {
      this.isLogin = login;
    });

  }

}
