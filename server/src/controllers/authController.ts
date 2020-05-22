import * as express from "express";
import { Request, Response } from "express";
import { OK, BAD_REQUEST, UNAUTHORIZED } from "http-status-codes";
import { sign as signJwt } from "jsonwebtoken";
import User from "../models/userModel";
import Board from "../models/boardModel";
import secureRoute from "../middleware/secureRoute";
import config from "../lib/config";

class AuthController {
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/login", this.login);
    this.router.get("/verify", secureRoute, this.verify);
  }

  verify = async (req: Request, res: Response) => {
    const { auth } = req.body;

    if (auth == null) {
      return res.status(UNAUTHORIZED).json({
        status: false,
        error: "Invalid auth",
      });
    }

    try {
      const user = await User.findById(auth.id, {
        username: 1,
        currentBoard: 1,
      });

      const userData = {
        id: user._id,
        name: user.username,
        currentBoard: user.currentBoard,
      };

      // generate new token
      const token = signJwt(userData, config.jwtSecret, {
        expiresIn: config.jwtExpire,
      });

      // load required data.
      const boards = await Board.find({}, { name: 1 });
      return res.status(OK).json({
        status: true,
        response: "Verify success",
        user: userData,
        token: token,
        boards: boards,
      });
    } catch (err) {
      console.log(err);
      return res.status(UNAUTHORIZED).json({
        status: false,
        error: "Invalid auth",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username == null || password == null) {
      return res.status(BAD_REQUEST).json({
        status: false,
        error: "Missing fields",
      });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "User not found",
        });
      }

      if (!user.comparePassword(password)) {
        return res.status(BAD_REQUEST).json({
          status: false,
          error: "Invalid username or password",
        });
      }

      const userData = {
        id: user._id,
        name: user.username,
        currentBoard: user.currentBoard,
      };

      const token = signJwt(userData, config.jwtSecret, {
        expiresIn: config.jwtExpire,
      });

      return res.status(OK).json({
        status: true,
        response: "Login success",
        user: userData,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).json({
        error: "Failed to login",
      });
    }
  };
}

export default AuthController;
