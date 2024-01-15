import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {


  private DBurl = "http://localhost:3000/workspaces";

  constructor(private http: HttpClient) { }

  getAllWorkspaces(): Observable<any> {
    return this.http.get(this.DBurl);
  }

  getWorkspaceById(workspaceId: number): Observable<any> {
    return this.http.get(`${this.DBurl}/${workspaceId}`);
  }

  addWorkspace(newWorkspace: any): Observable<any> {
    return this.http.post(this.DBurl, newWorkspace);
  }
  deleteWorkspace(workspaceId: number): Observable<any> {
    return this.http.delete(`${this.DBurl}/${workspaceId}`);
  }

  updateWorkspace(workspaceId: number, updatedWorkspace: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}`, updatedWorkspace);
  }

  

  
  
}
