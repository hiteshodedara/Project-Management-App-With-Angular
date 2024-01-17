import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Workspace } from '../models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {


  private DBurl = "http://localhost:8080/api/v1/workspaces";

  constructor(private http: HttpClient) { }

  getAllWorkspaces(): Observable<any> {
    return this.http.get(this.DBurl);
  }

  getWorkspaceById(workspaceId: number): Observable<any> {
    return this.http.get(`${this.DBurl}/${workspaceId}`);
  }

  addWorkspace(newWorkspace: Workspace): Observable<any> {
    return this.http.post(this.DBurl, newWorkspace);
  }
  deleteWorkspace(workspaceId: number): Observable<any> {
    return this.http.delete(`${this.DBurl}/${workspaceId}`);
  }

  updateWorkspace(workspaceId: number, updatedWorkspace: Workspace): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}`, updatedWorkspace);
  }

  private workspacesSubject = new BehaviorSubject<Workspace[]>([]);
  workspaces$ = this.workspacesSubject.asObservable();

  updateWorkspaces(workspaces: Workspace[]) {
    this.workspacesSubject.next(workspaces);
  }
  

  
  
}
