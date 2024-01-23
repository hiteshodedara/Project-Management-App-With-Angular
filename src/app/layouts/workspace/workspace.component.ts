import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.sass']
})
export class WorkspaceComponent {
  sidebar_show: boolean = true;
  close_sidebar() {
    this.sidebar_show = false;
  }

  cWorkspaceURLid!: number;

  for_openSidebar() {
    this.sidebar_show = true;
  }

  on_workspaceChange(event: any) {
    this.cWorkspaceURLid = event;

  }
}
