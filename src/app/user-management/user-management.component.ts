import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PostUser } from './../post.model';
import { Component, OnInit} from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  isAdmin = false;

  users : PostUser[]= [];

  constructor(private sService : StorageService,
    private router : Router,
    private authService : AuthService) { }

  deleteUser(index : number)
  {
    console.log(index);
    if(confirm("Sure twant to delete")){
      this.sService.deleteUserInfo(
        this.users[index].id,
        this.users[index].email,
        this.users[index].password,
        this.users[index].user);
      //this.users.splice(index, 1);
    }
  }

  ngOnInit(): void {

   this.sService.getUserInfo().subscribe(
     users =>{
       this.users = users;
       //console.log(this.users);
     }
   );

    this.authService.isAdmin.subscribe(
      admin => {
        this.isAdmin = admin;
      }
    );

    if (!this.isAdmin) {
      this.router.navigate(['/home']);
    }
  }

}
