import express from "express";
import { createBlog, getBlogs } from "./functions/blog";

const blogRouter = express();

// get requests
blogRouter.get("/all/:id", getBlogs);

// post requests
blogRouter.post("/create", createBlog);

export default blogRouter;
