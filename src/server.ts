import * as bodyParser from "body-parser";
import "reflect-metadata";
import { dbConnect } from "./repository/database";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { UserRepository } from "./repository/user/user.mongo.repository";
import { UserService } from "./services/user.services";
import "./controller/user.controller";

const port = 5000;
console.log("got here");
dbConnect();

const container = new Container({ skipBaseClassChecks: true });
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});

const app = server.build();

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
