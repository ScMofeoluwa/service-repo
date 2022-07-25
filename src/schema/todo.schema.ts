import { Schema } from "mongoose";
import { Todo } from "../entities/todo.entity";

const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, required: true, default: "pending" },
});

export { todoSchema };
