import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {


  workspace=[
    {id:1,title:"rajkot team"},
    {id:2,title:"ahemdabad team"},
    {id:3,title:"hitesh team"},
    {id:3,title:"hitesh team"},
    {id:3,title:"hitesh team"},
    {id:3,title:"hitesh team"},
    {id:3,title:"hitesh team"},
    {id:3,title:"hitesh team"},
  ]

  constructor() { }

  getallWorkspaces(){
    return of(this.workspace)
  }
}
