import { Request, Response } from "express";
import { defaultServerError } from "../../../utils/server-errors";
import fs from "fs";

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "Missing file",
      });
    }

    const { originalname, path } = req.file;

    const splittedOriginalName = originalname.split(".");
    const extension = splittedOriginalName[splittedOriginalName.length - 1];
    const newPath = `${path}.${extension}`;

    fs.renameSync(path, newPath);

    res.status(200).json({
      error: false,
      message: "File uploaded",
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}
