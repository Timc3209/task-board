import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Board from "../models/boardModel";
import TaskList from "../models/taskListModel";
import Task from "../models/taskModel";
import { reorderArray, moveArray } from "../lib/tools";

class TaskListController {
  public path = "/taskList";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/", this.createTaskList);
    this.router.delete("/:taskListID", this.deleteTaskList);
    this.router.put("/:taskListID", this.updateTaskList);
    this.router.post("/updateOrder", this.updateOrder);
  }

  updateOrder = async (req: Request, res: Response) => {
    const { sourceID, destinationID, sourceIndex, destinationIndex } = req.body;

    if (sourceID == null || destinationID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing Fields",
      });
    }

    try {
      if (sourceID === destinationID) {
        // same list
        const taskList: any = await TaskList.findById(destinationID).populate({
          path: "tasks",
          options: { sort: "sortOrder" },
        });
        const tasks = reorderArray(
          taskList.tasks,
          sourceIndex,
          destinationIndex
        );

        tasks.forEach(async (task: any, index: number) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: index + 1,
          });
        });
      } else {
        //other list

        const sourceList: any = await TaskList.findById(sourceID).populate({
          path: "tasks",
          options: { sort: "sortOrder" },
        });

        const destinationList: any = await TaskList.findById(
          destinationID
        ).populate({
          path: "tasks",
          options: { sort: "sortOrder" },
        });

        // new list
        const moveResult = moveArray(
          sourceList.tasks,
          destinationList.tasks,
          sourceIndex,
          destinationIndex
        );

        const { sourceItems, destinationItems } = moveResult;

        sourceItems.forEach(async (task: any, index: number) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: index + 1,
          });
        });

        destinationItems.forEach(async (task: any, index: number) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: index + 1,
            taskList: destinationID,
          });

          if (task.taskList !== sourceID) {
            await TaskList.findByIdAndUpdate(sourceID, {
              $pull: { tasks: task._id },
            });

            await TaskList.findByIdAndUpdate(destinationID, {
              $addToSet: { tasks: task._id },
            });
          }
        });
      }

      return res
        .status(OK)
        .json({ status: true, response: "taskList order Updated" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find taskList",
      });
    }
  };

  updateTaskList = async (req: Request, res: Response) => {
    const taskListID = req.params.taskListID;
    const { name } = req.body;

    if (taskListID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid taskListID",
      });
    }

    if (name == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing name",
      });
    }

    try {
      const updateResult = await TaskList.findByIdAndUpdate(taskListID, {
        name: name,
      });

      if (updateResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid taskListID",
        });
      }

      return res
        .status(OK)
        .json({ status: true, response: "taskList Updated" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find taskList",
      });
    }
  };

  deleteTaskList = async (req: Request, res: Response) => {
    const taskListID = req.params.taskListID;

    if (taskListID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid taskListID",
      });
    }

    try {
      const deleteResult = await TaskList.findByIdAndRemove(taskListID);

      if (deleteResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid taskListID",
        });
      }

      return res
        .status(OK)
        .json({ status: true, response: "taskList Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find taskList",
      });
    }
  };

  createTaskList = async (req: Request, res: Response) => {
    const { name, boardID } = req.body;

    if (boardID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid boardID",
      });
    }

    if (name == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing name",
      });
    }

    try {
      const result = await TaskList.create({
        name,
        board: boardID,
        tasks: [],
      });

      await Board.findByIdAndUpdate(boardID, {
        $addToSet: { taskList: result._id },
      });

      return res.status(OK).json({
        status: true,
        response: "taskList Created",
        taskListID: result._id,
      });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        error: "Failed to create tasklist",
      });
    }
  };
}

export default TaskListController;
