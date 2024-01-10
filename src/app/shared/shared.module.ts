import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopmenubarComponent } from './components/topmenubar/topmenubar.component';
import { SidemenubarComponent } from './components/sidemenubar/sidemenubar.component';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    TopmenubarComponent,
    SidemenubarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    TieredMenuModule,
    TooltipModule

  ],
  exports: [
    TopmenubarComponent,
    SidemenubarComponent,
  ]
})
export class SharedModule { }
