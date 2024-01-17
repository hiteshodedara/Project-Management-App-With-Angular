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
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

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
    DialogModule,
    ToastModule,
    TieredMenuModule,
    ConfirmPopupModule,
    AvatarModule,
    InputSwitchModule,
    ChipModule,
    DropdownModule
  ]
})
export class AuthorizedModule { }
