import { NextFunction, Request, Response } from "express";
import path from "path";
import { rootPath } from "..";

export function filterClientFiles(req: Request, res: Response, next: NextFunction) {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(rootPath, "public", "index.html"));
  }
}
