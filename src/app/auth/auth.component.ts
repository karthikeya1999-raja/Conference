import { StorageService } from './../storage.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router : Router,
    private sService : StorageService) { }

  isLoginMode = true;
  isLOading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  googleLogin(){
    this.authService.doGoogleLogin().then((x: firebase.default.auth.UserCredential) => {
      this.sService.getUserInfo().subscribe(userArray => {
        var found = false;
        for (const key of userArray) {
          if (x.user.email == key.email) {
              found = true;
          }
        }
        if(found){
          //console.log("Login Success");
          this.router.navigate(['/user']);
        }else{
          this.sService.storeUserInfo(x.user.displayName,x.user.email,x.user);
          //console.log("Login Success");
          this.router.navigate(['/user']);
        }
      });
    });
  }

  facebookLogin(){
    this.authService.doFaceBookLogin().then((x:firebase.default.auth.UserCredential) => {
      this.sService.getUserInfo().subscribe(userArray => {
        var found = false;
        for (const key of userArray) {
          if (x.user.email == key.email) {
            found = true;
          }
        }
        if (found) {
          //console.log("Login Success");
          this.router.navigate(['/user']);
        } else {
          this.sService.storeUserInfo(x.user.displayName, x.user.email, x.user);
          //console.log("Login Success");
          this.router.navigate(['/user']);
        }
      });
    });
  }

  submit(form: NgForm) {
    //console.log(form);
    if (!form.valid)
      return;

    const email = form.value.email;
    const password = form.value.password;
    const admin : boolean = form.value.admin;
    const fname = form.value.fname;
    const lname = form.value.lname;

    this.isLOading = true;
    if (this.isLoginMode) {
      try {
        this.authService.signIn(email, password, admin).then(isAdmin => {
          if (isAdmin) {
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/user']);
          }
        });
      } catch (error) {}
    }
    else {
      var name = fname + " " + lname;
      this.authService.signUp(email, password).then((x:firebase.default.User) => {
        this.sService.storeUserInfo(name, email,x, password);
        this.router.navigate(['/user']);
      });
    }

    form.reset();
  }

  ngOnInit(): void {

    this.authService.fetchAdmins().subscribe();
  }

}
