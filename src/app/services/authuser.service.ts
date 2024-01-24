import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registeruser } from '../models/registeruser';
import { Loginuser } from '../models/loginuser';
import { UserRole } from '../models/userrole';

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
    return this.http.get<any[]>(`${this.userURL}/user-roles/`)
  }

  getuserinfo(){
    const currentUser = localStorage.getItem('loginuser');
    if(currentUser){
      const data:string= JSON.parse(currentUser);
      const newdata=data.trim();
      

      const base64EncodedString = newdata // Your Base64-encoded string
      console.log('Encoded String:', base64EncodedString.trim());

      try {
        const decodedString = atob(base64EncodedString);
        console.log('Decoded String:', decodedString);
      } catch  {
        console.error('Error decoding string:');
      }

      
    }
  }

  // check login user 
  validateLoginCredentials(credentials: Loginuser): Observable<string> {
    return this.http.post(`${this.userURL}/login`, credentials, { responseType: 'text' });
  }

  addNewUser(user: Registeruser) {
    
    return this.http.post(`${this.userURL}/register`, user);
  }
}
