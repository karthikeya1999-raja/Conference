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

      this.mtService.endCall();
      document.getElementById('mvideo').style.display = "none";
      document.getElementById('rvideo').style.display = "none";
      document.getElementById('ssbtn').style.display = "none";
      document.getElementById('btn1').style.display = "none";
      document.getElementById('btn2').style.display = "none";
      document.getElementById('btn3').style.display = "none";
      document.getElementById('home').style.display = "block";
      this.mvideo.nativeElement.srcObject = null;
      this.rvideo.nativeElement.srcObject = null;
      if(this.isLogin){
        this.router.navigate(['/user']);
      }else{
        this.router.navigate(['/home']);
      }
    }
  }


  joinMeeting(){

    console.log(this.meetingId);
    var name = prompt("Enter Your Name");
    if (name.length != 0) {
      document.getElementById('mvideo').style.display = "block";
      document.getElementById('rvideo').style.display = "block";
      document.getElementById('ssbtn').style.display = "inline-block";
      document.getElementById('btn1').style.display = "inline-block";
      document.getElementById('btn2').style.display = "inline-block";
      document.getElementById('btn3').style.display = "inline-block";
      document.getElementById('home').style.display = "none";
      this.mtService.joinMeeting(this.meetingId, name, this.mvideo, this.rvideo);
    } else {
      alert("You must Enter your name");
    }
  }

  shareScreen(){
    this.mtService.screenShare();
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
