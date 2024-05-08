import express from "express";
import multer from "multer";
import { uploadImage } from "./functions/uploads";
const upload = multer({ dest: "uploads/" });

const filesRouter = express.Router();

filesRouter.post("/upload", upload.single("file"), uploadImage);

export default filesRouter;
