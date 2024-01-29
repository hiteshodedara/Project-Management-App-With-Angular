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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    LoginpageComponent,
    RegisterpageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    ToastModule,
    DropdownModule
  ]
})
export class UnauthorizedModule { }
