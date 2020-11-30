import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostUser } from './../../post.model';
import { Component, OnInit} from '@angular/core';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  isAdmin = false;
  isLoading = true;
  users : PostUser[]= [];

  constructor(private sService : StorageService,
    private router : Router,
    private authService : AuthService,
    private route : ActivatedRoute) { }

  back(){
    this.router.navigate(['../'],{relativeTo:  this.route});
  }

  deleteUser(index : number)
  {
    console.log(index);
    if(confirm("Sure twant to delete")){
      this.sService.deleteUserInfo(
        this.users[index].id,
        this.users[index].email,
        this.users[index].password,
        this.users[index].user);
        this.users.splice(index, 1);
    }
  }

  sort(){
    for (var i = 0; i < this.users.length; i++) {
      for (var j = i + 1; j < this.users.length; j++) {
        if (this.users[i].name.toLowerCase() > this.users[j].name.toLowerCase()) {
          var user = this.users[i];
          this.users[i] = this.users[j];
          this.users[j] = user;
        }
      }
    }
    this.isLoading = false;
  }

  ngOnInit(): void {

   this.sService.getUserInfo().subscribe(
     users =>{
       this.users = users;
       this.sort();
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
