import express from "express";
import { createBlog } from "./functions/blog";

const blogRouter = express();

// get requests

// post requests
blogRouter.post("/create", createBlog);

export default blogRouter;
