import express from "express";
import { createBlog, updateBlog, getBlogs, enterBlog } from "./functions/blog";
import { authorization } from "../../middlewares/authorization";

const blogRouter = express();

// get requests
blogRouter.get("/all/:id", authorization("user"), getBlogs);

blogRouter.get("/:nameId", enterBlog);

// post requests
blogRouter.post("/create", authorization("user"), createBlog);

// put requests
blogRouter.put("/update", authorization("user"), updateBlog);

export default blogRouter;
