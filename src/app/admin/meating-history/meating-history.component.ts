import { StorageService } from './../../storage.service';
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
    private sservice : StorageService,
    private route : ActivatedRoute) { }

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

    this.sservice.getUserSchedule().subscribe(meetings => {
      this.meetings = meetings;
      for(const key of this.meetings){
       const date = this.toNumberArray(key.meeting.mdate.split("-"));
       const time = this.toNumberArray(key.meeting.time.split(":"));
       const dur = this.toNumberArray(key.meeting.duration.split(":"));
       const msDate = new Date(date[0],date[1]-1,date[2],time[0],time[1]);
       const meDate = new Date(date[0],date[1]-1,date[2],time[0]+dur[0],time[1]+dur[1]);
       const tDate = new Date();
       if(tDate<msDate){
         key.status = "Yet to Start";
       }else if(tDate<meDate && tDate>msDate){
         key.status = "On Going";
       }else{
         key.status = "Ended";
       }
      }
    });

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
