import express from "express";
import { authorization } from "../../../middlewares/authorization";
import { createComment } from "./functions/comments";

const commentRouter = express.Router();

// get requests
commentRouter.get("/test", (_, res) => {
  console.log("herrroooo");
  res.status(200).json({ message: "hey" });
});

// post requests
commentRouter.post("/new", authorization("user"), createComment);

export default commentRouter;
