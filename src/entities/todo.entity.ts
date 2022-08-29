export interface Todo {
  _id: string;
  title: string;
  userId: string;
  timestamp: Date;
  status: string;
}

export interface ITodoService {
  createTodo(data: Omit<Todo, "_id">): Promise<Todo>;
  getTodos(userId: string): Promise<Todo[]>;
  getTodo(id: string): Promise<Todo>;
  deleteTodo(id: string): Promise<boolean>;
  updateTodo(id: string, data: Partial<Todo>): Promise<boolean>;
}
