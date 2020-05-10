import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Board from "../models/boardModel";
import TaskList from "../models/taskListModel";
import Task from "../models/taskModel";

class taskController {
  public path = "/task";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/", this.createTask);
    this.router.delete("/:taskID", this.deleteTask);
    this.router.put("/:taskID", this.updateTask);
  }

  updateTask = async (req: Request, res: Response) => {
    const taskID = req.params.taskID;
    const { name } = req.body;

    console.log(taskID);
    try {
      const updateResult = await Task.findByIdAndUpdate(taskID, {
        name: name,
      });
      console.log(updateResult);
      return res.status(OK).json({ status: true, response: "task Updated" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find task",
      });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const taskID = req.params.taskID;
    console.log(taskID);
    try {
      const deleteResult = await Task.findByIdAndRemove(taskID);
      console.log(deleteResult);
      return res.status(OK).json({ status: true, response: "task Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find task",
      });
    }
  };

  createTask = async (req: Request, res: Response) => {
    const { name, listID } = req.body;

    console.log(req.body);

    try {
      const taskList: any = await TaskList.findById(listID);
      const sortOrder = taskList.tasks.length + 1;

      const result = await Task.create({
        name,
        taskList: listID,
        sortOrder: sortOrder,
      });

      const updateResult = await TaskList.findByIdAndUpdate(listID, {
        $addToSet: { tasks: result._id },
      });

      return res.status(OK).json({
        status: true,
        response: "task Created",
        taskID: result._id,
      });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        error: "Failed to create task",
      });
    }
  };
}

export default taskController;
