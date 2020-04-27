import App from "./app";
import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger";
import HomeController from "./controllers/homeController";
import usersController from "./controllers/usersController";

const app = new App({
  port: 8080,
  controllers: [
    new HomeController(), // routes
    new usersController(),
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
  ],
});

app.listen();
