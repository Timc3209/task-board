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
const taskListModel_1 = require("../models/taskListModel");
const taskModel_1 = require("../models/taskModel");
class TaskController {
    constructor() {
        this.path = "/task";
        this.router = express.Router();
        this.updateTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskID = req.params.taskID;
            const { name } = req.body;
            try {
                yield taskModel_1.default.findByIdAndUpdate(taskID, {
                    name: name,
                });
                return res.status(http_status_codes_1.OK).json({ status: true, response: "task Updated" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find task",
                });
            }
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskID = req.params.taskID;
            try {
                yield taskModel_1.default.findByIdAndRemove(taskID);
                return res.status(http_status_codes_1.OK).json({ status: true, response: "task Deleted" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find task",
                });
            }
        });
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, listID } = req.body;
            try {
                const taskList = yield taskListModel_1.default.findById(listID);
                const sortOrder = taskList.tasks.length + 1;
                const result = yield taskModel_1.default.create({
                    name,
                    taskList: listID,
                    sortOrder: sortOrder,
                });
                yield taskListModel_1.default.findByIdAndUpdate(listID, {
                    $addToSet: { tasks: result._id },
                });
                return res.status(http_status_codes_1.OK).json({
                    status: true,
                    response: "task Created",
                    taskID: result._id,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: "Failed to create task",
                });
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/", this.createTask);
        this.router.delete("/:taskID", this.deleteTask);
        this.router.put("/:taskID", this.updateTask);
    }
}
exports.default = TaskController;
//# sourceMappingURL=taskController.js.map