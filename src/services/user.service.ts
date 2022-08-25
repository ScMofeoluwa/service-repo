import { UserRepository } from "../repository/user/user.knex.repository";
// import { UserRepository } from "../repository/user/user.mongo.repository";
import { IUserService } from "../interfaces/IUser";
import { genSalt, hash, compare } from "bcryptjs";
import { User } from "../entities/user.entity";
import { injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
  constructor(private readonly _repository: UserRepository) {}

  async createUser(data: Omit<User, "_id">): Promise<User> {
    let user = await this._repository.findByEmail(data.email);
    if (user) {
      throw new Error("user already exists.");
    }
    data.password = await this.hashPassword(data.password);
    user = await this._repository.create(data);
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this._repository.findOne(id);
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this._repository.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this._repository.findByEmail(email);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this._repository.delete(id);
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async isValidPassword(userGivenPassword: string, savedPassword: string): Promise<boolean> {
    return await compare(userGivenPassword, savedPassword);
  }
}
