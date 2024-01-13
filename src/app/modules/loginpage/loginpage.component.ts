import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Loginuser } from 'src/app/models/loginuser';
import { AuthuserService } from 'src/app/services/authuser.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.sass'],
  providers:[MessageService]
})
export class LoginpageComponent implements OnInit {
  userLoginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginuserservice: AuthuserService
    ,private messageService: MessageService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onPasswordShow() {
    this.showPassword = !this.showPassword;
  }

  onClickLogin() {
    if (this.userLoginForm.valid) {
      const loginuser:Loginuser=this.userLoginForm.value;
      console.log("login:",loginuser);
      
      this.loginuserservice.validateLoginCredentials(loginuser)
        .subscribe((result:any) => {
          console.log(result);
          
          if (result) {
            // Login successful logic
            this.messageService.add({ severity: 'success', summary: 'Login successful!', detail: 'valid credentials!' });
            console.log('Login successful!',result);
            localStorage.setItem('loginuser', JSON.stringify(result));
            setTimeout(() => {
              this.router.navigate(['/a']);
            }, 1000);
          } else {
            // Invalid credentials logic
            this.messageService.add({ severity: 'error', summary: 'Invalid credentials!', detail: 'Enter valid credentials!' });
            console.log('Invalid credentials!');
          }
        });
    }
  }
}
