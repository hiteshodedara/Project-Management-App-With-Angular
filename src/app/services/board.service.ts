import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private DBurl = "http://localhost:3000/workspaces";

  constructor(private http: HttpClient,private workspaceservice:WorkspaceService) { }
  getAllBoards(workspaceId: number): Observable<any> {
    return this.workspaceservice.getWorkspaceById(workspaceId).pipe(
      map((workspace: any) => workspace.boards)
    );
  }

  getBoardById(workspaceId: number, boardId: number): Observable<any> {
    return this.getAllBoards(workspaceId).pipe(
      map((boards: any[]) => boards.find(board => board.id === boardId))
    );
  }

  addBoard(workspaceId: number, newBoard: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards`, newBoard);
  }

  updateBoard(workspaceId: number, boardId: number, updatedBoard: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}`, updatedBoard);
  }
}
