import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import TaskList from "../models/taskListModel";
import Task from "../models/taskModel";

class TaskController {
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

    try {
      await Task.findByIdAndUpdate(taskID, {
        name: name,
      });
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

    try {
      await Task.findByIdAndRemove(taskID);
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

    try {
      const taskList: any = await TaskList.findById(listID);
      const sortOrder = taskList.tasks.length + 1;

      const result = await Task.create({
        name,
        taskList: listID,
        sortOrder: sortOrder,
      });

      await TaskList.findByIdAndUpdate(listID, {
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

export default TaskController;
