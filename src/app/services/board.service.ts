import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { WorkspaceService } from './workspace.service';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private DBurl = "http://localhost:3000/boards";

  constructor(private http: HttpClient,private workspaceservice:WorkspaceService) { }

  getAllBoards(workspaceId: number): Observable<Board[]> {
    return this.http.get<Board[]>(this.DBurl)
  }

  // getBoardById(workspaceId: number, boardId: number): Observable<any> {
  //   return this.getAllBoards(workspaceId).pipe(
  //     map((boards: any[]) => boards.find(board => board.id === boardId))
  //   );
  // }

  // addBoard(workspaceId: number, newBoard: any): Observable<any> {
  //   return this.http.post(`${this.DBurl}/${workspaceId}/boards`, newBoard);
  // }

  // updateBoard(workspaceId: number, boardId: number, updatedBoard: any): Observable<any> {
  //   return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}`, updatedBoard);
  // }
}
