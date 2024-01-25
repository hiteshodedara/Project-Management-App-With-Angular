import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkspaceSettingComponent } from '../../modules/workspace-setting/workspace-setting.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardhomeComponent } from 'src/app/modules/boardhome/boardhome.component';
import { WorkspacemembersComponent } from 'src/app/modules/workspacemembers/workspacemembers.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceSettingComponent,
    BoardhomeComponent,
    WorkspacemembersComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ]
})
export class WorkspaceModule { }
