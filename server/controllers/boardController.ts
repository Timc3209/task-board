import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import Board from "../models/boardModel";

class BoardController {
  public path = "/board";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/", this.createBoard);
    this.router.get("/", this.getAllBoards);
    this.router.get("/:boardID", this.getBoard);
    this.router.delete("/:boardID", this.deleteBoard);
    this.router.put("/:boardID", this.updateBoard);
  }

  updateBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;
    const { name } = req.body;

    try {
      await Board.findByIdAndUpdate(boardID, {
        name: name,
      });
      return res.status(OK).json({ status: true, response: "Board Updated" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to find boards",
      });
    }
  };

  deleteBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;
    try {
      await Board.findByIdAndRemove(boardID);
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

    try {
      const board = new Board({ name, taskList: [] });
      const result = await board.save();
      return res
        .status(OK)
        .json({ status: true, response: "Board Created", boardID: result._id });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        error: "Failed to create board",
      });
    }
  };
}

export default BoardController;
