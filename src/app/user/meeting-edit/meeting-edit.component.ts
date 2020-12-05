import { Meeting } from './../../meating.model';
import { AuthService } from './../../auth/auth.service';
import { MeetingService } from './../../meeting.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit {

  isAuthenticated = false;
  id: number;
  editMode = false;
  meetingForm : FormGroup;
  meeting : {meeting: Meeting,email: string,id: string,status?: string};

  constructor(private rout: ActivatedRoute,
    private router: Router,
    private mtService : MeetingService,
    private authService : AuthService) { }

  delete(){
    this.mtService.deleteMeeting(this.meeting.id).subscribe(() => {
      alert("Meeting Deleted Successfully");
      this.router.navigate(['/schedule-meeting']);
    });
  }

  submit(){
    console.log(this.meetingForm.value);
    this.mtService.updateMeeting(this.meetingForm.value, this.id).subscribe(response => {
      alert("Your Schedule Updated");
      console.log(response);
      this.router.navigate(['schedule-meeting']);
    });
  }

  private initform() {
    let mDate = '';
    let mTime = '';
    let mDuration = '';
    let mTopic = '';

    if (this.editMode) {
      const meeting = this.meeting;
      console.log(meeting.meeting.mdate)
      mDate = meeting.meeting.mdate.split('-').reverse().join('-');
      mTime = meeting.meeting.time;
      mDuration = meeting.meeting.duration;
      mTopic = meeting.meeting.topic;

    }

    this.meetingForm = new FormGroup({
      'mdate': new FormControl(mDate, Validators.required),
      'time': new FormControl(mTime, Validators.required),
      'duration': new FormControl(mDuration, Validators.required),
      'topic': new FormControl(mTopic, Validators.required)
    });
  }

  ngOnInit(): void {

    this.authService.user.subscribe(login => {
      this.isAuthenticated = login;
    });

    if (!this.isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    else {
      this.rout.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.meeting = this.mtService.getMeeting(this.id);
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.initform();
        }
      );
  }

 }
}
