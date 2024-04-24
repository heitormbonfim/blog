import express from "express";
import { createBlog, updateBlog, getBlogs } from "./functions/blog";

const blogRouter = express();

// get requests
blogRouter.get("/all/:id", getBlogs);

// post requests
blogRouter.post("/create", createBlog);

// put requests
blogRouter.put("/update", updateBlog);

export default blogRouter;
