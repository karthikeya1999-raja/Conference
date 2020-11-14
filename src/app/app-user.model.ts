export class AppUser{

  constructor(public name:string,
    public email:string,
    public password : string,
    public user : firebase.default.User){}
}
