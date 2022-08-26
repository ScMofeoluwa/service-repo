import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config";
import express from "express";
// import { DBService } from "./database/database";

export class App {
  async setup(port: number) {
    // const db = container.get(DBService);
    // await db.mongoConnect();
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  }
}
