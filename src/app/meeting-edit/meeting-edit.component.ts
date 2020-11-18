import { AuthService } from './../auth/auth.service';
import { MeetingService } from './../meeting.service';
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

  constructor(private rout: ActivatedRoute,
    private router: Router,
    private mtService : MeetingService,
    private authService : AuthService) { }

  submit(){
    console.log(this.meetingForm.value);
    this.mtService.updateMeeting(this.meetingForm.value, this.id);
  }

  private initform() {
    let mDate = '';
    let mTime = '';
    let mDuration = '';
    let mTopic = '';

    if (this.editMode) {
      const meeting = this.mtService.getMeeting(this.id);
      mDate = meeting.meeting.mdate;
      mTime = meeting.meeting.time;
      mDuration = meeting.meeting.duration;
      mTopic = meeting.meeting.topic;

    }

    this.meetingForm = new FormGroup({
      'mDate': new FormControl(mDate, Validators.required),
      'mTime': new FormControl(mTime, Validators.required),
      'mDuration': new FormControl(mDuration, Validators.required),
      'mTopic': new FormControl(mTopic, Validators.required)
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
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.initform();
        }
      );
  }

 }
}
