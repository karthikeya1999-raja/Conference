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
  show = false;
  isLoading = true;
  pusers : PostUser[] = [];
  usersCount : number ;
  meetingCount : number = 0;
  users : { user: PostUser, meetings: { meeting: Meeting, email: string, id: string, status?: string }[] }[] = [];
  meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];

  constructor(private authService:AuthService,
    private router : Router,
    private sService : StorageService,
    private mtService : MeetingService) { }

  sort(){
    for (var i = 0; i < this.users.length; i++) {
      for(var j=i+1;j<this.users.length;j++){
        if (this.users[i].user.name.toLowerCase() > this.users[j].user.name.toLowerCase()) {
          var user = this.users[i];
          this.users[i] = this.users[j];
          this.users[j] = user;
        }
      }
    }
  }

  showUsers(){
    this.show = !this.show;
  }

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

      this.sService.getUserInfo().subscribe(
        users => {
          this.usersCount = users.length;
          this.mtService.getUserMeetings();
          this.mtService.meetingsChanged.subscribe(
            mtngs => {
              this.meetingCount = mtngs.length;
              for(let user of users){
                var meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];
                for(let meeting of mtngs){
                  if(user.email == meeting.email){
                    //this.meetingCount += 1;
                    meetings.push(meeting);
                  }
                }
                this.users.push({user,meetings})
              }
              this.sort();
            }
          );
          this.isLoading = false;
        }
      );
    }
  }

}
