import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopmenubarComponent } from './components/topmenubar/topmenubar.component';
import { SidemenubarComponent } from './components/sidemenubar/sidemenubar.component';



@NgModule({
  declarations: [
    TopmenubarComponent,
    SidemenubarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopmenubarComponent,
    SidemenubarComponent,
  ]
})
export class SharedModule { }
