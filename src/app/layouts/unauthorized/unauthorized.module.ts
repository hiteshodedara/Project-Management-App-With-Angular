import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { LoginpageComponent } from '../../modules/loginpage/loginpage.component';
import { RegisterpageComponent } from '../../modules/registerpage/registerpage.component';
import { ForgotPasswordComponent } from '../../modules/forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UnauthorizedModule { }
