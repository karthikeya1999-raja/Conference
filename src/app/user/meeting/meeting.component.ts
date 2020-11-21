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

  @ViewChild('video') video ;

  constructor(private prService : PeerService,
    private authService : AuthService,
    private router : Router,
    private mtService : MeetingService) { }

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
      this.mtService.createNewMeeting(this.mtService.generateMeetingId(), this.video);
    }
  }

}
