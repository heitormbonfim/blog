import { Response } from "express";

export function returnServerError(res: Response, error: any) {
  res.status(500).json({
    error: true,
    message: "Internal server error",
  });
  console.error(error);
}
