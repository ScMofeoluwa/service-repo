import { User } from "../entities/user.entity";

export interface IUserService {
  createUser(data: Omit<User, "_id">): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  isValidPassword(
    userGivenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
