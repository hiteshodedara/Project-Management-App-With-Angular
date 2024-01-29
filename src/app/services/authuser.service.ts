import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registeruser } from '../models/registeruser';
import { Loginuser } from '../models/loginuser';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  private userURL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  isUserLogin(): boolean {
    const currentUser = localStorage.getItem('loginuser');
    return !!currentUser; // Returns true if currentUser is not null or undefined
  }

  getallUserRole():Observable<any[]>{
    return this.http.get<any[]>(`${this.userURL}/user-roles`)
  }

 getUserInfoByToken(token:any){
   return this.http.get(`${this.userURL}/get-by-token?token=${token}`)
 }

  // check login user 
  validateLoginCredentials(credentials: Loginuser): Observable<string> {
    return this.http.post(`${this.userURL}/login`, credentials, { responseType: 'text' });
  }

  addNewUser(user: Registeruser) {
    
    return this.http.post(`${this.userURL}/register`, user);
  }

  updateUser(user:any,rolename:string,uid:number):Observable<any>{

    const tempuser={
      username:user.username,
      email:user.email,
      password:user.password,
      role: rolename,
      descreption:"comming soon"
    }

    return this.http.put(`${this.userURL}/user/${uid}`, tempuser);
  }
}
