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
      this.sService.storeUserInfo(x.user.displayName, x.user.email,x.user);
      console.log("Login Success");
      this.router.navigate(['/home']);
    });
  }

  facebookLogin(){
    this.authService.doFaceBookLogin().then((x:firebase.default.auth.UserCredential) => {
      this.sService.storeUserInfo(x.user.displayName, x.user.email,x.user);
      console.log("Login Success");
      this.router.navigate(['/home']);
    });
  }

  submit(form: NgForm) {
    console.log(form);
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
            this.router.navigate(['/dashboard']);
          }
          else {
            this.router.navigate(['/home']);
          }
        });
      } catch (error) {}
    }
    else {
      this.authService.signUp(email, password).then((x:firebase.default.User) => {
        this.sService.storeUserInfo(fname+" "+lname, email,x, password);
        this.router.navigate(['/home']);
      });
    }

    form.reset();
  }

  ngOnInit(): void {

    this.authService.fetchAdmins().subscribe();
  }

}
