export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserService {
  createUser(data: Omit<User, "_id">): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  isValidPassword(userGivenPassword: string, savedPassword: string): Promise<boolean>;
}
