export interface PostUser{
  name : string;
  email : string;
  password : string;
  user : firebase.default.User;
  id? : string;
}
