import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";
import User from "../models/userModel";
import config from "../lib/config";
import secureRoute from "../middleware/secureRoute";

class UserController {
  public path = "/user";
  public router = express.Router();

  constructor() {
    this.initRoutes();
    this.checkDefaultUser();
  }

  public initRoutes() {
    this.router.post("/", secureRoute, this.createUser);
    this.router.get("/board/:boardID", secureRoute, this.setCurrentBoard);
  }

  createDefaultUser = async () => {
    try {
      const user = await User.create({
        username: config.defaultUser,
        password: config.defaultPassword,
      });

      if (!user) {
        console.log(`failed to create default user`);
        return false;
      }

      const userID = user._id;

      console.log(`default user created: ${userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  checkDefaultUser = async () => {
    try {
      // Pull default user.
      const defaultUser = await User.findOne({ username: config.defaultUser });

      // Default user not found, create one.
      if (!defaultUser) {
        this.createDefaultUser();
        return false;
      }

      // Check default password, if incorrect update it.
      if (!defaultUser.comparePassword(config.defaultPassword)) {
        defaultUser.password = config.defaultPassword;
        defaultUser.markModified("password");
        await defaultUser.save();
        console.log(`default user password updated: ${defaultUser._id}`);
        return false;
      }

      // Default user is stored with correct password.
      console.log(`default user ok: ${defaultUser._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  setCurrentBoard = async (req: Request, res: Response) => {
    const boardID = req.params.boardID;
    const { auth } = req.body;
    const currentBoard = boardID == null || boardID === "0" ? null : boardID;

    try {
      const updateResult = await User.findByIdAndUpdate(auth.id, {
        currentBoard,
      });

      if (updateResult == null) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid user board update",
        });
      }

      return res
        .status(OK)
        .json({ status: true, response: "Current Baord Updated" });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Failed to update user",
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username == null || password == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing fields",
      });
    }

    try {
      const user = await User.create({
        username,
        password,
      });

      if (!user) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "failed to create user",
        });
      }

      return res.status(OK).json({
        status: true,
        response: "User Created",
        userID: user._id,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Duplicate username",
        });
      }
      console.log(err);
      return res.status(BAD_REQUEST).json({
        error: "Failed to create user",
      });
    }
  };
}

export default UserController;
