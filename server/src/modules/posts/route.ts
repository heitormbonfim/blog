import express from "express";
import { authorization } from "../../middlewares/authorization";
import {
  addViewToPost,
  createNewPost,
  deletePostFromBlog,
  editPost,
  getPostByNameIdFromBlog,
  getPosts,
  getPostsFromBlog,
  sharePost,
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
postRouter.put("/share/:id", sharePost);
postRouter.put("/view", addViewToPost);

// delete requests
postRouter.delete("/:id", authorization("user"), deletePostFromBlog);

export default postRouter;
