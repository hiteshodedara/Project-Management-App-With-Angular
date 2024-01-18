import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized.component';
import { WorkspacehomeComponent } from '../../modules/workspacehome/workspacehome.component';
import { WorkspacemembersComponent } from '../../modules/workspacemembers/workspacemembers.component';
import { BoardhomeComponent } from '../../modules/boardhome/boardhome.component';
import { BoardtodolistComponent } from '../../modules/boardtodolist/boardtodolist.component';
import { BoardtodolistitemComponent } from '../../modules/boardtodolistitem/boardtodolistitem.component';
import { BoardShowComponent } from '../../modules/board-show/board-show.component';
import { TodoPopupModelComponent } from '../../modules/todo-popup-model/todo-popup-model.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@NgModule({
  declarations: [
    AuthorizedComponent,
    WorkspacehomeComponent,
    WorkspacemembersComponent,
    BoardhomeComponent,
    BoardtodolistComponent,
    BoardtodolistitemComponent,
    BoardShowComponent,
    TodoPopupModelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ]
})
export class AuthorizedModule { }
