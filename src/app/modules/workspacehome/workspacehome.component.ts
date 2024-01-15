import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Workspace } from 'src/app/models/workspace';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';
import { AuthuserService } from 'src/app/services/authuser.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspacehome.component.html',
  styleUrls: ['./workspacehome.component.sass']
})
export class WorkspacehomeComponent implements OnInit{

  workspaces$ = this.store.select(selectWorkspaces);

  constructor(private store: Store<Workspace>,private workspaceService:WorkspaceService,private authuser:AuthuserService) { }
  
  ngOnInit(): void {
    this.store.dispatch(loadWorkspaces());
  }

  
}
