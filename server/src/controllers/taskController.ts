import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import TaskList from "../models/taskListModel";
import Task from "../models/taskModel";
import secureRoute from "../middleware/secureRoute";

class TaskController {
  public path = "/task";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/", secureRoute, this.createTask);
    this.router.delete("/:taskID", secureRoute, this.deleteTask);
    this.router.put("/:taskID", secureRoute, this.updateTask);
  }

  updateTask = async (req: Request, res: Response) => {
    const taskID = req.params.taskID;
    const { name } = req.body;

    if (taskID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid taskID",
      });
    }

    if (name == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing name",
      });
    }

    try {
      const updateResult = await Task.findByIdAndUpdate(taskID, {
        name: name,
      });

      if (updateResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid name",
        });
      }

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

    if (taskID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid taskID",
      });
    }

    try {
      const deleteResult = await Task.findByIdAndRemove(taskID);

      if (deleteResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid taskID",
        });
      }

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

    if (listID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid listID",
      });
    }

    if (name == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing name",
      });
    }

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
