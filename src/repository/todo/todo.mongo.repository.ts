import { BaseRepository } from "../base/base.mongo.repository";
import { Todo } from "../../entities/todo.entity";

export class TodoRepository extends BaseRepository<Todo> {}
