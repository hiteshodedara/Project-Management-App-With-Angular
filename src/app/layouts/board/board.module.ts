import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { BoardShowComponent } from 'src/app/modules/board-show/board-show.component';
import { BoardtodolistComponent } from 'src/app/modules/boardtodolist/boardtodolist.component';
import { BoardtodolistitemComponent } from 'src/app/modules/boardtodolistitem/boardtodolistitem.component';
import { TodoPopupModelComponent } from 'src/app/modules/todo-popup-model/todo-popup-model.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    BoardComponent,
    BoardtodolistComponent,
    BoardtodolistitemComponent,
    BoardShowComponent,
    TodoPopupModelComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    RouterModule
  ]
})
export class BoardModule { }
