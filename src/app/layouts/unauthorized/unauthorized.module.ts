import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { LoginpageComponent } from '../../modules/loginpage/loginpage.component';
import { RegisterpageComponent } from '../../modules/registerpage/registerpage.component';
import { ForgotPasswordComponent } from '../../modules/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DropdownModule
  ]
})
export class UnauthorizedModule { }
