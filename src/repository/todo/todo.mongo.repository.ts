import { BaseRepository } from "../base/base.mongo.repository";
import { Todo } from "../../entities/todo.entity";
import { todoSchema } from "../../schema/todo.schema";
import { injectable } from "inversify";

@injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor() {
    super("todos", todoSchema);
  }
}
