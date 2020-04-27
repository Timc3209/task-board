import * as express from "express";
import { Request, Response } from "express";
import { OK } from "http-status-codes";

class UsersController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/all", this.index);
  }

  index = (req: Request, res: Response) => {
    const users = [
      {
        id: 1,
        name: "Ali",
      },
      {
        id: 2,
        name: "Can",
      },
      {
        id: 3,
        name: "Ahmet",
      },
    ];

    return res.status(OK).json({ users });
  };
}

export default UsersController;
