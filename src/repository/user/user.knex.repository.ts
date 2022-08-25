import { BaseRepository } from "../base/base.knex.repository";
import { User } from "../../entities/user.entity";
import { injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this._model.where("email", email).first();
    return result;
  }
}
