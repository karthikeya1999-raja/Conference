import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';
import { Meeting } from './meating.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MeetingService{

  meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];
  userEmail : string;
  meetingsChanged = new Subject<{meeting:Meeting,email:string,id:string,status?:string}[]>();

  constructor(private sservice : StorageService,
    private athService : AuthService){}

  getMeeting(id : number){
    return this.meetings[id];
  }

  updateMeeting(meeting : Meeting,id : number){
    meeting.meetingId = this.meetings[id].meeting.meetingId;
    this.meetings[id].meeting = meeting;
    return this.sservice.updateUserSchedule(meeting,this.meetings[id].id);
  }

  newMeeting(meeting:Meeting){
    this.userEmail = this.athService.getEmail();
    return this.sservice.storeUserSchedule(meeting,this.userEmail);
  }

  deleteMeeting(id : string){
    return this.sservice.deleteUSerSchedule(id);
  }

  toNumberArray(arr: string[]) {
    var numArray: number[] = [];
    for (const key of arr) {
      numArray.push(parseInt(key, 10));
    }
    return numArray;
  }

  getMyScheduleInfo() {
    this.userEmail = this.athService.getEmail();
    this.sservice.getUserSchedule().subscribe(meetings => {
      this.meetings = [];
      for (const key of meetings) {
        if (key.email == this.userEmail) {
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
      this.meetingsChanged.next(this.meetings);
    });
  }
}
