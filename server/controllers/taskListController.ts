import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Board from "../models/boardModel";
import TaskList from "../models/taskListModel";
import Task from "../models/taskModel";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (
  source: any,
  destination: any,
  startIndex: any,
  endIndex: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(startIndex, 1);

  destClone.splice(endIndex, 0, removed);

  const result = { sourceItems: sourceClone, destinationItems: destClone };
  return result;
};

class taskListController {
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

    try {
      if (sourceID === destinationID) {
        // same list
        const taskList: any = await TaskList.findById(destinationID).populate({
          path: "tasks",
          options: { sort: "sortOrder" },
        });
        const tasks: any = reorder(
          taskList.tasks,
          sourceIndex,
          destinationIndex
        );

        for (var i = 0; i < tasks.length; i++) {
          tasks[i].sortOrder = i + 1;
        }

        tasks.forEach(async (task: any) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: task.sortOrder,
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
        const moveResult = move(
          sourceList.tasks,
          destinationList.tasks,
          sourceIndex,
          destinationIndex
        );

        const { sourceItems, destinationItems }: any = moveResult;

        if (sourceItems.length > 0) {
          for (var i = 0; i < sourceItems.length; i++) {
            sourceItems[i].sortOrder = i + 1;
          }
        }

        if (destinationItems.length > 0) {
          for (var i = 0; i < destinationItems.length; i++) {
            destinationItems[i].sortOrder = i + 1;
          }
        }

        sourceItems.forEach(async (task: any) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: task.sortOrder,
          });
        });

        destinationItems.forEach(async (task: any) => {
          await Task.findByIdAndUpdate(task._id, {
            sortOrder: task.sortOrder,
            taskList: destinationID,
          });

          if (task.taskList !== sourceID) {
            const removeResult = await TaskList.findByIdAndUpdate(sourceID, {
              $pull: { tasks: task._id },
            });

            const updateResult = await TaskList.findByIdAndUpdate(
              destinationID,
              {
                $addToSet: { tasks: task._id },
              }
            );
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

    console.log(taskListID);
    try {
      const updateResult = await TaskList.findByIdAndUpdate(taskListID, {
        name: name,
      });
      console.log(updateResult);
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
    console.log(taskListID);
    try {
      const deleteResult = await TaskList.findByIdAndRemove(taskListID);
      console.log(deleteResult);
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

    console.log(req.body);

    try {
      const result = await TaskList.create({
        name,
        board: boardID,
        tasks: [],
      });

      const updateResult = await Board.findByIdAndUpdate(boardID, {
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

export default taskListController;
