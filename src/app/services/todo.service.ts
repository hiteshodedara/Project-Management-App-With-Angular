import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BoardService } from './board.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private DBurl = "http://localhost:3000/workspaces";

  constructor(private http: HttpClient, private boardservice: BoardService) { }

  getAllTodos(workspaceId: number, boardId: number): Observable<any> {
    return this.boardservice.getBoardById(workspaceId, boardId).pipe(
      map((board: any) => board.todos)
    );
  }

  getTodoById(workspaceId: number, boardId: number, todoId: number): Observable<any> {
    return this.getAllTodos(workspaceId, boardId).pipe(
      map((todos: any[]) => todos.find(todo => todo.id === todoId))
    );
  }

  addTodo(workspaceId: number, boardId: number, newTodo: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards/${boardId}/todos`, newTodo);
  }

  updateTodo(workspaceId: number, boardId: number, todoId: number, updatedTodo: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}/todos/${todoId}`, updatedTodo);
  }
}
