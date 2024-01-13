import { Component, OnInit } from '@angular/core';
import { AuthuserService } from 'src/app/services/authuser.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspacehome.component.html',
  styleUrls: ['./workspacehome.component.sass']
})
export class WorkspacehomeComponent implements OnInit{

  workspaces:any;

  constructor(private workspaceService:WorkspaceService,private authuser:AuthuserService) { }
  
  ngOnInit(): void {
      this.workspaces=this.workspaceService.getallWorkspaces();

  }

  on_get() {
    this.authuser.getuserinfo()
  }
}
