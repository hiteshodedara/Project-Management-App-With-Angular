import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';

@Component({
  selector: 'app-boardhome',
  templateUrl: './boardhome.component.html',
  styleUrls: ['./boardhome.component.sass']
})
export class BoardhomeComponent implements OnInit{
  Workspaces$ = this.store.select(selectWorkspaces);
  Workspaces!: Workspace[];
  selected_workspce!: Workspace ;


  constructor(private store:Store<AppState>){}

  ngOnInit() {
    this.initialize_workspaces();
    this.Workspaces$.subscribe(res => {
      this.Workspaces = res;
    });
  }


  initialize_workspaces(){
    this.loadWorkspacesOnStore()
    this.Workspaces$.subscribe(res=>{
      this.Workspaces=res
    })
  }
  //loading all workspce form ngrx store
  loadWorkspacesOnStore() {
    this.store.dispatch(loadWorkspaces());
  }
}
