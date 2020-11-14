import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meating-history',
  templateUrl: './meating-history.component.html',
  styleUrls: ['./meating-history.component.css']
})
export class MeatingHistoryComponent implements OnInit {

  isAdmin = false;

  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {

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
