"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger_1 = require("./middleware/logger");
const userController_1 = require("./controllers/userController");
const authController_1 = require("./controllers/authController");
const boardController_1 = require("./controllers/boardController");
const taskListController_1 = require("./controllers/taskListController");
const taskController_1 = require("./controllers/taskController");
const database_1 = require("./lib/database");
const config_1 = require("./lib/config");
database_1.default(config_1.default.databaseUrl);
const app = new app_1.default({
    port: config_1.default.port,
    controllers: [
        new userController_1.default(),
        new authController_1.default(),
        new boardController_1.default(),
        new taskListController_1.default(),
        new taskController_1.default(),
    ],
    middleWares: [
        cors(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger_1.default,
    ],
});
const server = app.listen();
exports.default = server;
//# sourceMappingURL=server.js.map