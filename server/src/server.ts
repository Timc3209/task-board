import App from "./app";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import loggerMiddleware from "./middleware/logger";
import UserController from "./controllers/userController";
import AuthController from "./controllers/authController";
import BoardController from "./controllers/boardController";
import TaskListController from "./controllers/taskListController";
import TaskController from "./controllers/taskController";
import connectDB from "./lib/database";
import config from "./lib/config";

connectDB(config.databaseUrl);

const app = new App({
  port: config.port,
  controllers: [
    new UserController(),
    new AuthController(),
    new BoardController(),
    new TaskListController(),
    new TaskController(),
  ],
  middleWares: [
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
  ],
});

const server = app.listen();

export default server;
