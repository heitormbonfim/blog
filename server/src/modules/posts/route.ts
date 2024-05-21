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

const postRouter = express.Router();

// get requests
postRouter.get("/", getPosts);
postRouter.get("/:blogNameId", getPostsFromBlog);
postRouter.get("/:blogNameId/:postNameId", getPostByNameIdFromBlog);

// post requests
postRouter.post("/post", authorization("user"), createNewPost);

// put requests
postRouter.put("/post", authorization("user"), editPost);
postRouter.put("/view", addViewToPost);

export default postRouter;
