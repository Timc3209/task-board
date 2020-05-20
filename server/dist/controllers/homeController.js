"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_codes_1 = require("http-status-codes");
class HomeController {
    constructor() {
        this.path = "/home";
        this.router = express.Router();
        this.index = (req, res) => {
            const users = [
                {
                    id: 1,
                    name: "Ali",
                },
                {
                    id: 2,
                    name: "Can",
                },
                {
                    id: 3,
                    name: "Ahmet",
                },
            ];
            return res.status(http_status_codes_1.OK).json({ users });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/all", this.index);
    }
}
exports.default = HomeController;
//# sourceMappingURL=homeController.js.map