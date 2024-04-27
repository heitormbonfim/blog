import { Request, Response } from "express";
import { returnServerError } from "../../../utils/server-errors";
import { getPosts } from "../../../databases/mongodb/functions/post/queries";

export async function createPost() {}

export async function getPostsFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.nameId;

    if (!blogNameId) {
      res.status(400).json({
        error: true,
        message: "No blog host provided",
      });
    }

    const posts = getPosts({ blogNameId });

    res.status(200).json({
      error: false,
      message: "Posts found",
      data: posts,
    });
  } catch (error) {
    return returnServerError(res, error);
  }
}

export async function getPostByNameId() {}
