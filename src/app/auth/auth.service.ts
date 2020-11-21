import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    email : string;
    name : string;
    user = new BehaviorSubject<boolean>(null);
    admins = [];
    isAdmin = new BehaviorSubject<boolean>(null);

    constructor(private http: HttpClient,private afAuth : AngularFireAuth) { }

    getEmail()
    {
      return this.email;
    }

    doGoogleLogin(){
      return new Promise<any>((resolve, reject) => {
        let provider = new firebase.default.auth.GoogleAuthProvider();
        this.afAuth.signInWithPopup(provider).then(res => {
          resolve(res);
          this.user.next(true);
          this.email = res.user.email;
          this.name = res.user.displayName;
          return res;
        }, err => {
          console.log(err);
          reject(err);
        })
      });
    }

    doFaceBookLogin(){
      return new Promise<any>((resolve, reject) => {
        let provider = new firebase.default.auth.FacebookAuthProvider();
        this.afAuth.signInWithPopup(provider).then(res => {
            resolve(res);
            this.user.next(true);
            this.email = res.user.email;
            this.name = res.user.displayName;
            return res;
          }, err => {
            console.log(err);
            reject(err);
          })
      });
    }

    signIn(email : string,password : string, admin : boolean, name : string){

      this.email = email;
      var found = true;
      if(admin){
        for(var i=0;i<this.admins.length;i++){
          if(email == this.admins[i].Email){
            found = true;
            admin = true;
            this.isAdmin.next(found);
            break;
          }
          found = false;
          admin = false;
        }
      }
      if(found){
        return this.afAuth.signInWithEmailAndPassword(email,password).then(x => {
          console.log("Signin Success",x);
          this.user.next(true);
          this.name = name;
          return admin;
        }).catch(error => {
          alert("You are not a user....\nPlease SignUp!!");
          console.log("Signin Failed",error);
        });
      }
      else{
        alert("Application says you are not admin");
      }
    }

    signUp(email: string, password: string, name : string){
      this.email = email;
       return this.afAuth.createUserWithEmailAndPassword(email,password).then(x => {
         console.log("signUp Success",x);
         this.user.next(true);
         this.name = name;
         return x.user;
       }).catch(error => {
         console.log("SignUp failed",error);
       });
    }

    signOut(){

      this.afAuth.signOut().then(() => {
        this.user.next(false);
        this.isAdmin.next(false);
        console.log("Logout Success");
      });

    }

    fetchAdmins(){
      return this.http.get<any[]>('https://samachar-b2961.firebaseio.com/Admin.json')
      .pipe(map(admins => {
        //console.log(admins);
        this.admins = admins;
      }));
    }

}
