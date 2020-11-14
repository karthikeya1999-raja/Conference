import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit{

  isLogin = false;
  isAdmin = false;

  constructor(private router : Router,private authService : AuthService) { }

  logout()
  {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    this.authService.user.subscribe(
      user => {
        this.isLogin = !!user;
      }
    );
  }

}
