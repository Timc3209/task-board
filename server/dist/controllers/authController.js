"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = require("../models/userModel");
const boardModel_1 = require("../models/boardModel");
const secureRoute_1 = require("../middleware/secureRoute");
const config_1 = require("../lib/config");
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = express.Router();
        this.verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { auth } = req.body;
            if (auth == null) {
                return res.status(http_status_codes_1.UNAUTHORIZED).json({
                    status: false,
                    error: "Invalid auth",
                });
            }
            try {
                const user = yield userModel_1.default.findById(auth.id, {
                    username: 1,
                    currentBoard: 1,
                });
                const userData = {
                    id: user._id,
                    name: user.username,
                    currentBoard: user.currentBoard,
                };
                // generate new token
                const token = jsonwebtoken_1.sign(userData, config_1.default.jwtSecret, {
                    expiresIn: config_1.default.jwtExpire,
                });
                // load required data.
                const boards = yield boardModel_1.default.find({}, { name: 1 });
                return res.status(http_status_codes_1.OK).json({
                    status: true,
                    response: "Verify success",
                    user: userData,
                    token: token,
                    boards: boards,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.UNAUTHORIZED).json({
                    status: false,
                    error: "Invalid auth",
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (username == null || password == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Missing fields",
                });
            }
            try {
                const user = yield userModel_1.default.findOne({ username });
                if (!user) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "User not found",
                    });
                }
                if (!user.comparePassword(password)) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "Invalid username or password",
                    });
                }
                const userData = {
                    id: user._id,
                    name: user.username,
                    currentBoard: user.currentBoard,
                };
                const token = jsonwebtoken_1.sign(userData, config_1.default.jwtSecret, {
                    expiresIn: config_1.default.jwtExpire,
                });
                return res.status(http_status_codes_1.OK).json({
                    status: true,
                    response: "Login success",
                    user: userData,
                    token,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: "Failed to login",
                });
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/login", this.login);
        this.router.get("/verify", secureRoute_1.default, this.verify);
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map