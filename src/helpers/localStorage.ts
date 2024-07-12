import { Todo } from "../types";

export const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load todos from localStorage", error);
    return [];
  }
};

export const loadTrashFromLocalStorage = (): Todo[] => {
  try {
    const serializedState = localStorage.getItem("trash");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load trash from localStorage", error);
    return [];
  }
};

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem("todos", serializedState);
  } catch (error) {
    console.error("Failed to save todos to localStorage", error);
  }
};

export const saveTrashToLocalStorage = (trash: Todo[]): void => {
  try {
    const serializedState = JSON.stringify(trash);
    localStorage.setItem("trash", serializedState);
  } catch (error) {
    console.error("Failed to save trash to localStorage", error);
  }
};

export const deleteTodoFromLocalStorage = (id: string): void => {
  try {
    const todosData = localStorage.getItem("todos");
    if (todosData) {
      const todos = JSON.parse(todosData) as Todo[];
      const updatedTodos = todos.filter(todo => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  } catch (error) {
    console.error(
      `Failed to delete todo with ID ${id} from local storage:`,
      error
    );
  }
};

export const deleteTrashFromLocalStorage = (id: string): void => {
  try {
    const trashData = localStorage.getItem("trash");
    if (trashData) {
      const trash = JSON.parse(trashData) as Todo[];
      const updatedTrash = trash.filter(todo => todo.id !== id);
      localStorage.setItem("trash", JSON.stringify(updatedTrash));
    }
  } catch (error) {
    console.error(
      `Failed to delete trash with ID ${id} from local storage:`,
      error
    );
  }
};
