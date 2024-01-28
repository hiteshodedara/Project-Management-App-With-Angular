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

  private newurl ="http://localhost:8080/api/v1/workspaces"

  constructor(private http: HttpClient,private workspaceservice:WorkspaceService) { }

  getalldatabaseBoards(): Observable<Board[]>{
    return this.http.get<Board[]>(`${this.newurl}/boards`)
  }

  getAllBoards(workspaceId: number): Observable<Board[]> {
    
    return this.http.get<Board[]>(`${this.newurl}/${workspaceId}/boards`)
  }

  getBoardById(workspaceId: number, boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.newurl}/${workspaceId}/boards/${boardId}`)
  }

  addBoard(workspaceId: number, newBoard: Board): Observable<Board> {

    const tempBoard:Board={
      title:newBoard.title,
      description:newBoard.description,
      isFavorite:newBoard.isFavorite,
      workspaceId:workspaceId
    }

    return this.http.post<Board>(`${this.newurl}/${workspaceId}/boards`, tempBoard);
  }

  updateBoard(workspaceId: number, boardId: number, updatedBoard: any): Observable<any> {
    return this.http.put(`${this.newurl}/${workspaceId}/boards/${boardId}`, updatedBoard);
  }
  
  deleteBoard(boardId:number,workspaceId:number):Observable<any>{
    return this.http.delete(`${this.newurl}/${workspaceId}/boards/${boardId}`)
  }

  favoriteToggle(boardId: number, workspaceId: number): Observable<any>{
    const favorite="true";
    return this.http.patch(`${this.newurl}/${workspaceId}/boards/${boardId}/toggleFavorite`,favorite)
  }
}
