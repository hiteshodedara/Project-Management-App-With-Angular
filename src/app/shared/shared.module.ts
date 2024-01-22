import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopmenubarComponent } from './components/topmenubar/topmenubar.component';
import { SidemenubarComponent } from './components/sidemenubar/sidemenubar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TopmenubarComponent,
    SidemenubarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    RouterModule
  ],
  exports: [
    TopmenubarComponent,
    SidemenubarComponent,
  ]
})
export class SharedModule { }
