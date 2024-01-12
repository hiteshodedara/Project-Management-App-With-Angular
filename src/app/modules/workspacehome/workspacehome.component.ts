import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspacehome.component.html',
  styleUrls: ['./workspacehome.component.sass']
})
export class WorkspacehomeComponent implements OnInit{

  workspaces:any;

  constructor(private workspaceService:WorkspaceService) { }
  
  ngOnInit(): void {
      this.workspaces=this.workspaceService.getallWorkspaces();

  }
}
