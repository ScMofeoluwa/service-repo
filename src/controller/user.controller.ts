import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { controller, httpPost, httpGet } from "inversify-express-utils";

@controller("/users")
export class UserController {
  constructor(public readonly _service: UserService) {}

  @httpGet("/:id")
  async index(req: Request, res: Response): Promise<any> {
    const user = await this._service.getUser(req.params.id);
    if (!user) return res.status(404).send({ message: "user with given ID does not exist", data: null });
    res.status(200).send({ message: "successful", data: user });
  }
}
