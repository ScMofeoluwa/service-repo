import { connect } from "mongoose";

export const dbConnect = () => {
  connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to MongoDB.."))
    .catch((err) => console.log("Could not connect to MongoDB", err));
};
