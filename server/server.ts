import App from "./app";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import loggerMiddleware from "./middleware/logger";
import BoardController from "./controllers/boardController";
import TaskListController from "./controllers/taskListController";
import TaskController from "./controllers/taskController";

const port = process.env.PORT || 3000;
const databaseUrl = process.env.MONGOLAB_URI || "mongodb://localhost/new";

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${databaseUrl}`);
});

mongoose.connection.on("connected", () => {
  console.log(`connected to database: ${databaseUrl}`);
});

mongoose.set("toJSON", { virtuals: true });

const app = new App({
  port: port,
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
