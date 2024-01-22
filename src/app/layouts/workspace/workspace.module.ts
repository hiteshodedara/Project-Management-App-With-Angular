import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkspaceSettingComponent } from '../../modules/workspace-setting/workspace-setting.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceSettingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class WorkspaceModule { }
