import { Todolist } from "src/app/models/todolist";

export interface TodolistState {
  todolists: Todolist[];
  archivedTodolists: Todolist[];
  unArchivedTodolists: Todolist[];
  // Add other state properties if needed
}

export const initialTodolistState: TodolistState = {
  todolists: [],
  archivedTodolists: [],
  unArchivedTodolists: []
  // Initialize other state properties if needed
};
