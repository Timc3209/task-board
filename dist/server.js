"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger_1 = require("./middleware/logger");
const boardController_1 = require("./controllers/boardController");
const taskListController_1 = require("./controllers/taskListController");
const TaskController_1 = require("./controllers/TaskController");
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
const app = new app_1.default({
    port: 8080,
    controllers: [
        new boardController_1.default(),
        new taskListController_1.default(),
        new TaskController_1.default(),
    ],
    middleWares: [
        cors(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger_1.default,
    ],
});
app.listen();
//# sourceMappingURL=server.js.map