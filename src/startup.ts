import express from "express"
import "reflect-metadata";
import { dbConnect } from "./db/mongo-database";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { UserRepository } from "./repository/user/user.knex.repository";
import { UserService } from "./services/user.services";
import "./controller/user.controller";


export function startup(port: number) {
  dbConnect();
  const container = new Container({ skipBaseClassChecks: true });
  container.bind(UserService).toSelf();
  container.bind(UserRepository).toSelf();
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.json())
  });

  const app = server.build();

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

startup(5000)