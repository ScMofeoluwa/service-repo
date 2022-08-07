import { UserService } from "../services/user.services";
import { validateCreate } from "../validators/user.validator";
import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";

@controller("/users")
export class UserController {
  constructor(public readonly _service: UserService) {}

  @httpPost("/")
  async create(req: Request, res: Response): Promise<void> {
    const { error } = validateCreate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const user = await this._service.createUser(req.body);
    res.status(201).send(user);
  }
}
