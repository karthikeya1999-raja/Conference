import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLogin : boolean;

  constructor(private router : Router,private atservice : AuthService) { }

  ngOnInit(): void {

    this.atservice.user.subscribe(login => {
      this.isLogin = login;
    });

    if(!this.isLogin){
      this.router.navigate(['/home']);
    }
  }

}
