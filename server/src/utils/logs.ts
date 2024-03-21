import { NextFunction, Request, Response } from "express";

export default function logs(req: Request, _: Response, next: NextFunction) {
  const method = req.method;
  const query = req.query;
  const body = req.body;
  const headers = req.headers;
  const path = req.path;
  const date = `${new Date().getHours()}h ${new Date().getMinutes()}m - ${new Date().toLocaleDateString(
    "pt-br"
  )}`;

  console.log(`\n\n${date} - ${method} ${path}`);
  console.log("headers:", headers);
  console.log("query:", query);
  console.log("body:", body);

  next();
}
