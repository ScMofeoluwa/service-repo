import { Schema } from "mongoose";
import { User } from "../entities/user.entity";

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export { userSchema };
