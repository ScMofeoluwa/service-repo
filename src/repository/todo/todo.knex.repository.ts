import { BaseRepository } from "../base/base.knex.repository";
import { Todo } from "../../entities/todo.entity";
import { injectable } from "inversify";

@injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor() {
    super("todos");
  }
}
