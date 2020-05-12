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
const boardModel_1 = require("../models/boardModel");
class BoardController {
    constructor() {
        this.path = "/board";
        this.router = express.Router();
        this.updateBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const boardID = req.params.boardID;
            const { name } = req.body;
            try {
                yield boardModel_1.default.findByIdAndUpdate(boardID, {
                    name: name,
                });
                return res.status(http_status_codes_1.OK).json({ status: true, response: "Board Updated" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find boards",
                });
            }
        });
        this.deleteBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const boardID = req.params.boardID;
            try {
                yield boardModel_1.default.findByIdAndRemove(boardID);
                return res.status(http_status_codes_1.OK).json({ status: true, response: "Board Deleted" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find boards",
                });
            }
        });
        this.getAllBoards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const boards = yield boardModel_1.default.find({}, { name: 1 });
                return res.status(http_status_codes_1.OK).json({ status: true, boards: boards });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find boards",
                });
            }
        });
        this.getBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const boardID = req.params.boardID;
            try {
                const board = yield boardModel_1.default.findById(boardID).populate({
                    path: "taskList",
                    populate: { path: "tasks", options: { sort: "sortOrder" } },
                });
                return res.status(http_status_codes_1.OK).json({ status: true, board: board });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find board",
                });
            }
        });
        this.createBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const board = new boardModel_1.default({ name, taskList: [] });
                const result = yield board.save();
                return res
                    .status(http_status_codes_1.OK)
                    .json({ status: true, response: "Board Created", boardID: result._id });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: "Failed to create board",
                });
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/", this.createBoard);
        this.router.get("/", this.getAllBoards);
        this.router.get("/:boardID", this.getBoard);
        this.router.delete("/:boardID", this.deleteBoard);
        this.router.put("/:boardID", this.updateBoard);
    }
}
exports.default = BoardController;
//# sourceMappingURL=boardController.js.map