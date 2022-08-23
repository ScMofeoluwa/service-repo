import { connect } from "mongoose";
import knex from "knex";
import { config } from "./knexfile";
import { injectable } from "inversify";

@injectable()
export class DBService {
  async mongoConnect() {
    await connect("mongodb+srv://mongo:djROJfNopmCqJFAg@cluster0.5w8f3nf.mongodb.net/test");
    console.log("connected to Mongo Cluster");
  }

  knexConnect() {
    const db = knex(config.development);
    return db;
  }
}
