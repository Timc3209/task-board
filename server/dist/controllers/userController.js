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
const userModel_1 = require("../models/userModel");
const config_1 = require("../lib/config");
const secureRoute_1 = require("../middleware/secureRoute");
class UserController {
    constructor() {
        this.path = "/user";
        this.router = express.Router();
        this.createDefaultUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.create({
                    username: config_1.default.defaultUser,
                    password: config_1.default.defaultPassword,
                });
                if (!user) {
                    console.log(`failed to create default user`);
                    return false;
                }
                const userID = user._id;
                console.log(`default user created: ${userID}`);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.checkDefaultUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Pull default user.
                const defaultUser = yield userModel_1.default.findOne({ username: config_1.default.defaultUser });
                // Default user not found, create one.
                if (!defaultUser) {
                    this.createDefaultUser();
                    return false;
                }
                // Check default password, if incorrect update it.
                if (!defaultUser.comparePassword(config_1.default.defaultPassword)) {
                    defaultUser.password = config_1.default.defaultPassword;
                    defaultUser.markModified("password");
                    yield defaultUser.save();
                    console.log(`default user password updated: ${defaultUser._id}`);
                    return false;
                }
                // Default user is stored with correct password.
                console.log(`default user ok: ${defaultUser._id}`);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.setCurrentBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const boardID = req.params.boardID;
            const { auth } = req.body;
            const currentBoard = boardID == null || boardID === "0" ? null : boardID;
            try {
                const updateResult = yield userModel_1.default.findByIdAndUpdate(auth.id, {
                    currentBoard,
                });
                if (updateResult == null) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "Invalid user board update",
                    });
                }
                return res
                    .status(http_status_codes_1.OK)
                    .json({ status: true, response: "Current Baord Updated" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to update user",
                });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (username == null || password == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Missing fields",
                });
            }
            try {
                const user = yield userModel_1.default.create({
                    username,
                    password,
                });
                if (!user) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "failed to create user",
                    });
                }
                return res.status(http_status_codes_1.OK).json({
                    status: true,
                    response: "User Created",
                    userID: user._id,
                });
            }
            catch (err) {
                if (err.code === 11000) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "Duplicate username",
                    });
                }
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: "Failed to create user",
                });
            }
        });
        this.initRoutes();
        this.checkDefaultUser();
    }
    initRoutes() {
        this.router.post("/", secureRoute_1.default, this.createUser);
        this.router.get("/board/:boardID", secureRoute_1.default, this.setCurrentBoard);
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map