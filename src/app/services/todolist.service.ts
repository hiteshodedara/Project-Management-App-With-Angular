import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  private DBurl = "http://localhost:8080/api/v1/workspaces";

  constructor(private http: HttpClient,private boardservice:BoardService) { }


  getAllTodoLists(workspaceId: number, boardId: number): Observable<any> {
    return this.http.get(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists`)
  }

  getTodoListById(workspaceId: number, boardId: number, todoListId: number): Observable<any> {
    return this.getAllTodoLists(workspaceId, boardId).pipe(
      map((todolists: any[]) => todolists.find(list => list.id === todoListId))
    );
  }

  addTodoList(workspaceId: number, boardId: number, newTodoList: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists`, newTodoList);
  }

  updateTodoList(workspaceId: number, boardId: number, todoListId: number, updatedTodoList: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists/${todoListId}`, updatedTodoList);
  }
  toggleArchiveStatus(workspaceId: number, boardId: number, todoListId: number): Observable<any>{
    return this.http.patch(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists/${todoListId}/toggleArchive`,'')
  }

}
