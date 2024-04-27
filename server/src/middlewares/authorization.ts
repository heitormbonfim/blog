import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../databases/mongodb/schemas/user";
import dotenv from "dotenv";
import { returnServerError } from "../utils/server-errors";
dotenv.config();

const secret = process.env.JWT_SECRET || "no-secret";

export function authorization(userAccess: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("auth");

      if (!token) {
        return res.status(403).json({
          error: true,
          message: "Missing Token",
        });
      }

      const user = jwt.verify(token, secret) as User;

      const { role } = user;

      const isAuthorized = role == userAccess || role == "admin" ? true : false;

      if (!isAuthorized) {
        return res.status(403).json({
          error: true,
          message: "Access Denied",
        });
      }

      req.body = { ...req.body, user };

      next();
    } catch (error) {
      returnServerError(res, error);
    }
  };
}
