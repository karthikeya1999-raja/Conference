import { MeetingService } from './../../meeting.service';
import { AuthService } from './../../auth/auth.service';
import { Meeting } from './../../meating.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meating-history',
  templateUrl: './meating-history.component.html',
  styleUrls: ['./meating-history.component.css']
})
export class MeatingHistoryComponent implements OnInit {

  isAdmin = false;
  isLoading = true;
  meetings : {meeting:Meeting,email:string,id:string,status?:string}[] = [];

  constructor(private authService : AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private mtService : MeetingService) { }

  back(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  IsAdmin(email : string){
    return email == 'karthikeya.hosahalli.1999@gmail.com'||
      email == 'meghubhat06@gmail.com'||
      email == 'krishnaprasadnr2017@gmail.com';
  }

  ngOnInit(): void {

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    if(!this.isAdmin){
      this.router.navigate(['/home']);
    }else{
      this.mtService.getUserMeetings();
      this.mtService.meetingsChanged.subscribe(
        meetings => {
          this.meetings = meetings;
          this.isLoading = false;
        });
    }
  }

}
