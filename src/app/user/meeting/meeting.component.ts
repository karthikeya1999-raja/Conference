import  Peer  from 'peerjs';
import { MeetingService } from './../../meeting.service';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { PeerService } from './../../peer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  isLogin : boolean;

  @ViewChild('mvideo') mvideo ;
  @ViewChild('rvideo') rvideo;

  constructor(private authService : AuthService,
    private router : Router,
    private mtService : MeetingService) { }

  changeVideo(){
    this.mtService.changeVideo();
  }

  changeAudio(){
    this.mtService.changeAudio();
  }
  end(){
    if(confirm("Sure to leave Meeting")){
      this.router.navigate(['/user']);
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.authService.user.subscribe(login => {
      this.isLogin = login;
    });
    if (!this.isLogin) {
      alert("Please Login to Host Meeting");
      this.router.navigate(['/home']);
    } else {
      this.mtService.createNewMeeting(this.mtService.generateMeetingId(), this.rvideo,this.mvideo);
    }
  }

}
