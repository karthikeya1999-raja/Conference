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

  constructor(private authService:AuthService,private router : Router) { }

  ngOnInit(): void {

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    if(!this.isAdmin)
    {
       this.router.navigate(['/user']);
    }
  }

}
