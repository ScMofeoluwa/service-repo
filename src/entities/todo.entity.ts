import { ObjectId } from "mongoose";
export interface Todo {
  title: string;
  userId: ObjectId | number;
  timestamp: Date;
  status: string;
}
