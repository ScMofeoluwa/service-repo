import { BaseRepository } from "../base/base.mongo.repository";
import { User } from "../../entities/user.entity";
import { injectable } from "inversify";
import { userSchema } from "../../schema/user.schema";

@injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users", userSchema);
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this._model.findOne({ where: { email: email } });
    // @ts-expect-error
    return result;
  }
}
