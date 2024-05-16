import express from "express";
import { authorization } from "../../middlewares/authorization";
import {
  createNewPost,
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

export default postRouter;
