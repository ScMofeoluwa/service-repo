import { BaseRepository } from "../base/base.mongo.repository";
import { User } from "../../entities/user.entity";

export class UserRepository extends BaseRepository<User> {
  async findByEmail(email: string): Promise<User> {
    const result = await this._model.findOne({ where: { email: email } });
    // @ts-expect-error
    return result;
  }
}
