import { connect } from "mongoose";
import knex from "knex";
import { config } from "./knexfile";
import { injectable } from "inversify";

@injectable()
export class DBService {
  async mongoConnect() {
    await connect("mongodb://localhost:27000/test");
    console.log("connected to Mongo Cluster");
  }

  knexConnect() {
    const db = knex(config.development);
    return db;
  }
}
