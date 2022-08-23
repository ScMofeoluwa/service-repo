import { BaseRepository } from "../base/base.knex.repository";
import { Todo } from "../../entities/todo.entity";
import { injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<Todo> {
  constructor() {
    super("todo");
  }
}
