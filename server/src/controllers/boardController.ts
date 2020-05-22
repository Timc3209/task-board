import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Board from "../models/boardModel";
import secureRoute from "../middleware/secureRoute";

class BoardController {
  public path = "/board";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/", secureRoute, this.createBoard);
    this.router.get("/", secureRoute, this.getAllBoards);
    this.router.get("/:boardID", secureRoute, this.getBoard);
    this.router.delete("/:boardID", secureRoute, this.deleteBoard);
    this.router.put("/:boardID", secureRoute, this.updateBoard);
  }

  updateBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;
    const { name } = req.body;

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
      const updateResult = await Board.findByIdAndUpdate(boardID, {
        name: name,
      });

      if (updateResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid boardID",
        });
      }

      return res.status(OK).json({ status: true, response: "Board Updated" });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Duplicate board name",
        });
      }
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find boards",
      });
    }
  };

  deleteBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;

    if (boardID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid boardID",
      });
    }

    try {
      const deleteResult = await Board.findByIdAndRemove(boardID);

      if (deleteResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid boardID",
        });
      }
      return res.status(OK).json({ status: true, response: "Board Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find boards",
      });
    }
  };

  getAllBoards = async (req: Request, res: Response) => {
    try {
      const boards = await Board.find({}, { name: 1 });
      return res.status(OK).json({ status: true, boards: boards });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find boards",
      });
    }
  };

  getBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;

    if (boardID == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Invalid boardID",
      });
    }

    try {
      const board = await Board.findById(boardID).populate({
        path: "taskList",
        populate: { path: "tasks", options: { sort: "sortOrder" } },
      });
      return res.status(OK).json({ status: true, board: board });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find board",
      });
    }
  };

  createBoard = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (name == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing name",
      });
    }

    try {
      const board = new Board({ name, taskList: [] });
      const result = await board.save();
      return res
        .status(OK)
        .json({ status: true, response: "Board Created", boardID: result._id });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Duplicate board name",
        });
      }
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to create board",
      });
    }
  };
}

export default BoardController;
