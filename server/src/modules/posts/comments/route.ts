import express from "express";
import { authorization } from "../../../middlewares/authorization";
import { createComment, getCommentsFromPostWithinRange } from "./functions/comments";

const commentRouter = express.Router();

// get requests
commentRouter.get("/", getCommentsFromPostWithinRange);

// post requests
commentRouter.post("/new", authorization("user"), createComment);

// delete requests
commentRouter.delete("/:commentId");

export default commentRouter;
