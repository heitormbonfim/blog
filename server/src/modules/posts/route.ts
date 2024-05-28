import express from "express";
import { authorization } from "../../middlewares/authorization";
import {
  addViewToPost,
  createNewPost,
  editPost,
  getPostByNameIdFromBlog,
  getPosts,
  getPostsFromBlog,
} from "./functions/posts";
import commentRouter from "./comments/route";

const postRouter = express.Router();
// comments
postRouter.use("/comments/", commentRouter);

// get requests
postRouter.get("/", getPosts);
postRouter.get("/:blogNameId", getPostsFromBlog);
postRouter.get("/:blogNameId/:postNameId", getPostByNameIdFromBlog);

// post requests
postRouter.post("/", authorization("user"), createNewPost);

// put requests
postRouter.put("/", authorization("user"), editPost);
postRouter.put("/view", addViewToPost);

export default postRouter;
