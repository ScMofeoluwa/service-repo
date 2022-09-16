import "reflect-metadata";
import "./controller/user.controller";
import "./controller/todo.controller";
import "./controller/auth.controller";
import { App } from "./application";
import { configuration as conf } from "./config/config";

export async function startup(port: number) {
  const app = new App();
  await app.setup(port);
}

startup(conf.app_port);
