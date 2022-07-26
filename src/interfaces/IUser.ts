import { User } from "../entities/user.entity";

export interface IUserService {
  createUser(data: User): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  updateUser(id: string): Promise<boolean>;
  deleteUser(id: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
