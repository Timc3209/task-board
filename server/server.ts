import App from "./app";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import loggerMiddleware from "./middleware/logger";
import BoardController from "./controllers/boardController";
import TaskListController from "./controllers/taskListController";
import TaskController from "./controllers/TaskController";

mongoose.connect("mongodb://localhost/new", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: mongodb://localhost/new`);
});

mongoose.set("toJSON", { virtuals: true });

const app = new App({
  port: 8080,
  controllers: [
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

app.listen();
