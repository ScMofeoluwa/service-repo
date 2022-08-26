import { TodoService } from "../services/todo.service";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { container } from "../inversify.config";
import { validateCreate, validateUpdate } from "../validators/todo.validator";
import { Request, Response } from "express";
import { controller, httpGet, httpDelete, httpPatch, httpPost } from "inversify-express-utils";

@controller("/todos")
export class TodoController {
  constructor(public readonly _service: TodoService) {}

  @httpPost("/", container.get(AuthMiddleware).authorize)
  async store(req: Request, res: Response): Promise<void> {
    const { error } = validateCreate(req.body);
    if (error) res.status(400).send({ message: error.details[0].message, data: null });
    //@ts-expect-error
    req.body.userId = req.user.id;
    const todo = await this._service.createTodo(req.body);
    res.status(201).send({ message: "todo successfully created", data: todo });
  }

  @httpGet("/", container.get(AuthMiddleware).authorize)
  async show(req: Request, res: Response): Promise<void> {
    //@ts-expect-error
    const todos = await this._service.getTodos(req.user.id);
    res.status(200).send({ message: "", data: todos });
  }

  @httpGet("/:id", container.get(AuthMiddleware).authorize)
  async index(req: Request, res: Response): Promise<any> {
    try {
      const todo = await this._service.getTodo(req.params.id);
      //@ts-expect-error
      if (todo.userId != req.user.id) return res.status(404).send({ message: "todo not found", data: null });
      res.status(200).send({ message: "", data: todo });
    } catch (err) {
      //@ts-expect-error
      res.status(400).send({ message: err.message, data: null });
    }
  }

  @httpPatch("/:id", container.get(AuthMiddleware).authorize)
  async update(req: Request, res: Response): Promise<any> {
    try {
      const { error } = validateUpdate(req.body);
      if (error) res.status(400).send({ message: error.details[0].message, data: null });
      const todo = await this._service.getTodo(req.params.id);
      //@ts-expect-error
      if (todo.userId != req.user.id) return res.status(404).send({ message: "todo not found", data: null });
      await this._service.updateTodo(req.params.id, req.body);
      res.status(200).send({ message: "todo successfully updated", data: null });
    } catch (err) {
      //@ts-expect-error
      res.status(400).send({ message: err.message, data: null });
    }
  }

  @httpDelete("/:id", container.get(AuthMiddleware).authorize)
  async destroy(req: Request, res: Response): Promise<any> {
    try {
      const todo = await this._service.getTodo(req.params.id);
      //@ts-expect-error
      if (todo.userId != req.user.id) return res.status(404).send({ message: "todo not found", data: null });
      await this._service.deleteTodo(req.params.id);
      res.status(200).send({ message: "todo successfully deleted", data: null });
    } catch (err) {
      //@ts-expect-error
      res.status(400).send({ message: err.message, data: null });
    }
  }
}
