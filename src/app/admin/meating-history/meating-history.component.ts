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
  meetings : {meeting:Meeting,email:string,id:string,status?:string}[] = []

  constructor(private authService : AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private mtService : MeetingService) { }

  back(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  toNumberArray(arr : string[]){
    var numArray : number[] = [];
    for(const key of arr){
      numArray.push(parseInt(key,10));
    }
    return numArray;
  }

  ngOnInit(): void {

    this.mtService.getUserMeetings();
    this.mtService.meetingsChanged.subscribe(
      meetings => {
        this.meetings = meetings;
      }
    );

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    if(!this.isAdmin){
      this.router.navigate(['/home']);
    }
  }

}
