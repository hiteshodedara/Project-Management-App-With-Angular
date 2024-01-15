import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: any[];
  // Add other state properties if needed
}

export const initialTodoState: TodoState = {
  todos: [],
  // Initialize other state properties if needed
};

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(TodoActions.addTodo, (state, { workspaceId, boardId, newTodo }) => {
    const updatedTodos = state.todos.find(todo => todo.workspaceId === workspaceId && todo.boardId === boardId)
      ? state.todos.map(todo => (todo.workspaceId === workspaceId && todo.boardId === boardId ? { ...todo, newTodo } : todo))
      : [...state.todos, { workspaceId, boardId, newTodo }];
    return { ...state, todos: updatedTodos };
  }),
  on(TodoActions.updateTodo, (state, { workspaceId, boardId, todoId, updatedTodo }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.workspaceId === workspaceId && todo.boardId === boardId && todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    ),
  })),
  // Add other reducer cases for CRUD operations if needed
);
