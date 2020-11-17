import { Meeting } from './meating.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { PostUser } from './post.model';
import { AppUser } from './app-user.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient,private afAuth : AngularFireAuth) { }

  storeUserInfo(name: string, email: string, user: firebase.default.User,password? : string,)
  {
    const usr = new AppUser(name,email,password,user);

    this.http.post<{name : string}>('https://samachar-b2961.firebaseio.com/users.json',usr)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

  getUserInfo()
  {
    return this.http.get<AppUser[]>('https://samachar-b2961.firebaseio.com/users.json')
      .pipe(map(response => {
         const userArray : PostUser[] = [];
         for(const key in response)
         {
           if(response.hasOwnProperty(key))
           {
             userArray.push({...response[key],id : key});
           }
         }
         return userArray;
      })
      );
  }

  deleteUserInfo(id: string, email : string,password: string,user : firebase.default.User) {
    console.log(id);
    this.afAuth.fetchSignInMethodsForEmail(email).then(x=>{
      var y = x[0];
      if(y == "password"){
          this.afAuth.signInWithEmailAndPassword(email,password).then(x => {
            x.user.delete().then(() =>{
            console.log("User deleted Successfully");
              this.http.delete('https://samachar-b2961.firebaseio.com/users/'+id+'.json').subscribe();
          })
        });
      }
      else{

    }
    });
  }

  storeUserShedule(meetings : Meeting[])
  {
    this.http.post<{name:string}>('https://samachar-b2961.firebaseio.com/users.json', meetings)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }
}