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
const taskListModel_1 = require("../models/taskListModel");
const taskModel_1 = require("../models/taskModel");
const secureRoute_1 = require("../middleware/secureRoute");
const tools_1 = require("../lib/tools");
class TaskListController {
    constructor() {
        this.path = "/taskList";
        this.router = express.Router();
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { sourceID, destinationID, sourceIndex, destinationIndex } = req.body;
            if (sourceID == null || destinationID == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Missing Fields",
                });
            }
            try {
                if (sourceID === destinationID) {
                    // same list
                    const taskList = yield taskListModel_1.default.findById(destinationID).populate({
                        path: "tasks",
                        options: { sort: "sortOrder" },
                    });
                    const tasks = tools_1.reorderArray(taskList.tasks, sourceIndex, destinationIndex);
                    tasks.forEach((task, index) => __awaiter(this, void 0, void 0, function* () {
                        yield taskModel_1.default.findByIdAndUpdate(task._id, {
                            sortOrder: index + 1,
                        });
                    }));
                }
                else {
                    //other list
                    const sourceList = yield taskListModel_1.default.findById(sourceID).populate({
                        path: "tasks",
                        options: { sort: "sortOrder" },
                    });
                    const destinationList = yield taskListModel_1.default.findById(destinationID).populate({
                        path: "tasks",
                        options: { sort: "sortOrder" },
                    });
                    // new list
                    const moveResult = tools_1.moveArray(sourceList.tasks, destinationList.tasks, sourceIndex, destinationIndex);
                    const { sourceItems, destinationItems } = moveResult;
                    sourceItems.forEach((task, index) => __awaiter(this, void 0, void 0, function* () {
                        yield taskModel_1.default.findByIdAndUpdate(task._id, {
                            sortOrder: index + 1,
                        });
                    }));
                    destinationItems.forEach((task, index) => __awaiter(this, void 0, void 0, function* () {
                        yield taskModel_1.default.findByIdAndUpdate(task._id, {
                            sortOrder: index + 1,
                            taskList: destinationID,
                        });
                        if (task.taskList !== sourceID) {
                            yield taskListModel_1.default.findByIdAndUpdate(sourceID, {
                                $pull: { tasks: task._id },
                            });
                            yield taskListModel_1.default.findByIdAndUpdate(destinationID, {
                                $addToSet: { tasks: task._id },
                            });
                        }
                    }));
                }
                return res
                    .status(http_status_codes_1.OK)
                    .json({ status: true, response: "taskList order Updated" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find taskList",
                });
            }
        });
        this.updateTaskList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskListID = req.params.taskListID;
            const { name } = req.body;
            if (taskListID == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Invalid taskListID",
                });
            }
            if (name == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Missing name",
                });
            }
            try {
                const updateResult = yield taskListModel_1.default.findByIdAndUpdate(taskListID, {
                    name: name,
                });
                if (updateResult == null) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "Invalid taskListID",
                    });
                }
                return res
                    .status(http_status_codes_1.OK)
                    .json({ status: true, response: "taskList Updated" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find taskList",
                });
            }
        });
        this.deleteTaskList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskListID = req.params.taskListID;
            if (taskListID == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Invalid taskListID",
                });
            }
            try {
                const deleteResult = yield taskListModel_1.default.findByIdAndRemove(taskListID);
                if (deleteResult == null) {
                    return res.status(http_status_codes_1.BAD_REQUEST).json({
                        status: false,
                        error: "Invalid taskListID",
                    });
                }
                return res
                    .status(http_status_codes_1.OK)
                    .json({ status: true, response: "taskList Deleted" });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Failed to find taskList",
                });
            }
        });
        this.createTaskList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, boardID } = req.body;
            if (boardID == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Invalid boardID",
                });
            }
            if (name == null) {
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    status: false,
                    error: "Missing name",
                });
            }
            try {
                const result = yield taskListModel_1.default.create({
                    name,
                    board: boardID,
                    tasks: [],
                });
                yield boardModel_1.default.findByIdAndUpdate(boardID, {
                    $addToSet: { taskList: result._id },
                });
                return res.status(http_status_codes_1.OK).json({
                    status: true,
                    response: "taskList Created",
                    taskListID: result._id,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(http_status_codes_1.BAD_REQUEST).json({
                    error: "Failed to create tasklist",
                });
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/", secureRoute_1.default, this.createTaskList);
        this.router.delete("/:taskListID", secureRoute_1.default, this.deleteTaskList);
        this.router.put("/:taskListID", secureRoute_1.default, this.updateTaskList);
        this.router.post("/updateOrder", secureRoute_1.default, this.updateOrder);
    }
}
exports.default = TaskListController;
//# sourceMappingURL=taskListController.js.map