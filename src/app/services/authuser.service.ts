import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registeruser } from '../models/registeruser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Loginuser } from '../models/loginuser';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  UserURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  isUserLogin() {
    const curruntuser=localStorage.getItem('loginuser')
    let user='';
    if(curruntuser){;
      user=JSON.parse(curruntuser)
    }

    if(user){
      return true;
    }else{
      return false;
    }

    
    

    
    
  }

  getallUser(): Observable<Registeruser[]> {
    return this.http.get<Registeruser[]>(this.UserURL);
  }

  // check login user 
  validateLoginCredentials(credentials: any): Observable<boolean> {
    return this.getallUser().pipe(
      map((users: Registeruser[]) =>
        users.some(
          (user: Registeruser) =>
            user.email === credentials.email && user.password === credentials.password
        )
      )
    );
  }

  addNewUser(user: Registeruser) {
    return this.http.post(this.UserURL, user);
  }
}
