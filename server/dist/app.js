"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api" + controller.path, controller.router);
        });
        this.app.get("/", (req, res) => {
            res.sendFile(path.resolve("../") + "/client/build/index.html");
        });
    }
    assets() {
        this.app.use(express.static(path.resolve("../") + "/client/build"));
    }
    listen() {
        const server = this.app.listen(this.port, () => {
            console.log(`App is listening on the port: ${this.port}`);
        });
        return server;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map