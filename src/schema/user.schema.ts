import { Schema } from "mongoose";
import { User } from "../entities/user.entity";

const userSchema = new Schema<User>(
  {
    _id: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export { userSchema };
