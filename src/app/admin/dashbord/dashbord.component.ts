import { MeetingService } from './../../meeting.service';
import { Meeting } from './../../meating.model';
import { PostUser } from './../../post.model';
import { StorageService } from './../../storage.service';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  isAdmin = false;
  isLoading;
  pusers : PostUser[] = [];
  users : { user: PostUser, meetings: { meeting: Meeting, email: string, id: string, status?: string }[] }[] = [];
  meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];

  constructor(private authService:AuthService,
    private router : Router,
    private sService : StorageService,
    private mtService : MeetingService) { }

  ngOnInit(): void {

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    if(!this.isAdmin)
    {
       this.router.navigate(['/user']);
    }else{

      this.isLoading = true;
      this.sService.getUserInfo().subscribe(
        users => {
          this.pusers = users;
          this.mtService.getUserMeetings();
          this.mtService.meetingsChanged.subscribe(
            mtngs => {
              this.meetings = mtngs;
              for(let user of this.pusers){
                var meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];
                for(let meeting of this.meetings){
                  if(user.email == meeting.email){
                    meetings.push(meeting);
                  }
                }
                this.users.push({user,meetings})
              }
              console.log(this.users);
            }
          );
          this.isLoading = false;
        }
      );
    }
  }

}
