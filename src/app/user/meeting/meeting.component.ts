import { Meeting } from './../../meating.model';
import { MeetingService } from './../../meeting.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit, AfterViewInit {

  isLogin : boolean;
  id : number;
  meetingId : string;
  meetings : {meeting:Meeting,email:string,id:string,status?:string}[];

  @ViewChild('mvideo') mvideo;
  @ViewChild('rvideo') rvideo;
  videoStreams = [];

  constructor(private authService : AuthService,
    private router : Router,
    private mtService : MeetingService,
    private route : ActivatedRoute) { }

  changeVideo(){
    this.mtService.changeVideo();
  }

  changeAudio(){
    this.mtService.changeAudio();
  }

  shareScreen(){
    this.mtService.screenShare();
  }

  end(){
    if(confirm("Sure to leave Meeting")){
      this.mtService.endCall();
      this.mvideo.nativeElement.srcObject = null;
      this.rvideo.nativeElement.srcObject = null;
      this.router.navigate(['/user']);
    }
  }

  ngOnInit(): void {

    this.mtService.meetingsChanged.subscribe(
      meetings => {
        this.meetings = meetings;
      });

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log(this.id);
      }
    );

  }

  ngAfterViewInit(): void {

    this.authService.user.subscribe(login => {
      this.isLogin = login;
    });

    if (!this.isLogin) {
      alert("Please Login to Host Meeting");
      this.router.navigate(['/home']);
    } else {
      if(this.id){
        this.meetings = this.mtService.meetings;
        var meeting = this.meetings[this.id];
        this.mtService.createNewMeeting(meeting.meeting.meetingId,this.rvideo,this.mvideo);
      }else{
        this.meetingId = this.mtService.generateMeetingId();
        this.mtService.createNewMeeting(this.meetingId, this.rvideo, this.mvideo);
      }
    }
  }

}
