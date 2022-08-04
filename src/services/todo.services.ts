import { TodoRepository } from "../repository/todo/todo.mongo.repository";
import { ITodoService } from "../interfaces/ITodo";
import { Todo } from "../entities/todo.entity";
import { injectable } from "inversify";

@injectable()
export class TodoService implements ITodoService {
  constructor(private readonly _repository: TodoRepository) {}

  async createTodo(data: Omit<Todo, "_id">): Promise<Todo> {
    const todo = await this._repository.create(data);
    return todo;
  }

  async getTodo(id: string): Promise<Todo> {
    const todo = await this._repository.findOne(id);
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    const todos = await this._repository.find();
    return todos;
  }

  async deleteTodo(id: string): Promise<boolean> {
    const result = await this._repository.delete(id);
    return result;
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<boolean> {
    const result = await this._repository.update(id, data);
    return result;
  }
}
