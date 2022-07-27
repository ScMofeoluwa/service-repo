import { ObjectId } from "mongoose";
export interface Todo {
  _id: string;
  title: string;
  userId: string;
  timestamp: Date;
  status: string;
}
