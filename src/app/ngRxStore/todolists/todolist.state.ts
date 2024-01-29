import { Todolist } from "src/app/models/todolist";

export interface TodolistState {
  todolists: Todolist[];
  // Add other state properties if needed
}

export const initialTodolistState: TodolistState = {
  todolists: [],
  // Initialize other state properties if needed
};
