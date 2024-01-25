import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent {
  sidebar_show: boolean = true;
  currunt_boardID!: any;

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

  on_boardId_change(event: any) {
    this.currunt_boardID = event

  }
}
