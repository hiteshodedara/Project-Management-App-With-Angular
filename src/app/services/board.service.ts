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
    
    return this.http.get<Board[]>(this.DBurl).pipe(
      map((boards: Board[]) => boards.filter(board => board.workspaceId === workspaceId))
    );
  }

  getBoardById(workspaceId: number, boardId: number): Observable<Board | undefined> {
    return this.getAllBoards(workspaceId).pipe(
      map((boards: Board[]) => boards.find(board => board.id === boardId))
    );
  }

  addBoard(workspaceId: number, newBoard: Board): Observable<Board> {

    const tempBoard:Board={
      title:newBoard.title,
      description:newBoard.description,
      isArchive:newBoard.isArchive,
      isFavorite:newBoard.isFavorite,
      workspaceId:workspaceId
    }

    return this.http.post<Board>(`${this.DBurl}`, tempBoard);
  }

  updateBoard(workspaceId: number, boardId: number, updatedBoard: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}`, updatedBoard);
  }
  
  deleteBoard(boardId:number):Observable<any>{
    return this.http.delete(`${this.DBurl}/${boardId}`)
  }
}
