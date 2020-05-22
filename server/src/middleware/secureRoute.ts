import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status-codes";
import { verify as verifyJwt } from "jsonwebtoken";
import config from "../lib/config";

const secureRoute = (req: Request, resp: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return resp.status(UNAUTHORIZED).json({
      status: false,
      error: "no token found...",
    });
  }

  verifyJwt(token, config.jwtSecret, (err: any, auth: any) => {
    if (err) {
      return resp.status(UNAUTHORIZED).json({
        status: false,
        error: "no token found...",
      });
    }
    req.body.token = token;
    req.body.auth = auth;
    next();
  });
};

export default secureRoute;
