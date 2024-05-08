import { Request, Response } from "express";

export function checkIfApiIsAlive(_: Request, res: Response) {
  res.status(200).json({ error: false, message: "API Version 1 is working" });
}
