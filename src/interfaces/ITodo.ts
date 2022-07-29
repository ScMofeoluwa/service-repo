import { Todo } from "../entities/todo.entity";

export interface ITodoService {
  createTodo(data: Omit<Todo, "_id">): Promise<Todo>;
  getTodos(): Promise<Todo[]>;
  getTodo(id: string): Promise<Todo>;
  deleteTodo(id: string): Promise<boolean>;
  updateTodo(id: string, data: Partial<Todo>): Promise<boolean>;
}
