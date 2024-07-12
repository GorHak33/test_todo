import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../../types";
import {
  deleteTodoFromLocalStorage,
  deleteTrashFromLocalStorage,
  loadTodosFromLocalStorage,
  loadTrashFromLocalStorage,
  saveTodosToLocalStorage,
  saveTrashToLocalStorage,
} from "../../helpers/localStorage";

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage() || [],
  deletedTodos: loadTrashFromLocalStorage() || [],
};

const toggleStatus = (status: string): string => {
  return status === "Completed" ? "Pending" : "Completed";
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const deletedTodo = state.todos.find(todo => todo.id === action.payload);
      if (deletedTodo) {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        deletedTodo.status = "Removed";
        state.deletedTodos.push(deletedTodo);
        saveTodosToLocalStorage(state.todos);
        saveTrashToLocalStorage(state.deletedTodos);
      }
    },
    markAsComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = toggleStatus(todo.status);
        saveTodosToLocalStorage(state.todos);
      }
    },
    checkOverdue: state => {
      const currentDate = new Date();
      state.todos.forEach(todo => {
        if (
          todo.deadline &&
          new Date(todo.deadline) < currentDate &&
          todo.status !== "Completed"
        ) {
          todo.status = "Overdue";
        }
      });
      saveTodosToLocalStorage(state.todos);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const editedTodo = action.payload;
      state.todos = state.todos.map(task =>
        task.id === editedTodo.id ? editedTodo : task
      );
      saveTodosToLocalStorage(state.todos);
    },
    removeDeletedTodo: (state, action: PayloadAction<string>) => {
      state.deletedTodos = state.deletedTodos.filter(
        todo => todo.id !== action.payload
      );
      deleteTrashFromLocalStorage(action.payload);
      saveTrashToLocalStorage(state.deletedTodos);
    },
    restoreTodo: (state, action: PayloadAction<string>) => {
      const restoredTodo = state.deletedTodos.find(
        todo => todo.id === action.payload
      );
      if (restoredTodo) {
        state.deletedTodos = state.deletedTodos.filter(
          todo => todo.id !== action.payload
        );
        restoredTodo.status = "Pending";
        state.todos.push(restoredTodo);
        saveTodosToLocalStorage(state.todos);
        saveTrashToLocalStorage(state.deletedTodos);
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  markAsComplete,
  checkOverdue,
  removeDeletedTodo,
  restoreTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
