import { BaseRepository } from "../base/base.mongo.repository";
import { User } from "../../entities/user.entity";

export class UserRepository extends BaseRepository<User> {}
