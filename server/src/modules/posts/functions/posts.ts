import { Request, Response } from "express";
import { returnServerError } from "../../../utils/server-errors";
import {
  createPost,
  getBlogPosts,
  getPostFromBlogByNameId,
} from "../../../databases/mongodb/functions/post/queries";
import { setNameIdFormat } from "../../../utils/strings-manipulation";
import { findBlogByNameId } from "../../../databases/mongodb/functions/blog/queries";

export async function createNewPost(req: Request, res: Response) {
  try {
    const { title, summary, blog_id: blogId, author, content } = req.body;

    if (!title || !summary || !blogId || !author || !title || !content) {
      return res.status(400).json({
        error: true,
        message: "Missing important data",
      });
    }

    const nameId = setNameIdFormat(title);

    const postAlreadyExists = await getPostFromBlogByNameId({ nameId, blogId });

    if (postAlreadyExists) {
      return res.status(403).json({
        error: true,
        message: "Post already exists",
      });
    }

    const post = await createPost({ title, summary, author, content, nameId, blogId });

    res.status(201).json({
      error: false,
      message: "New post created",
      data: post,
    });
  } catch (error) {
    return returnServerError(res, error);
  }
}

export async function getPostsFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.blogNameId;

    if (!blogNameId) {
      res.status(400).json({
        error: true,
        message: "No blog host provided",
      });
    }

    const blog = await findBlogByNameId(blogNameId);

    if (!blog) {
      return res.status(400).json({
        error: true,
        message: "Could not find blog",
      });
    }

    const blogId = blog._id.toString();

    const posts = await getBlogPosts({ blogId });

    res.status(200).json({
      error: false,
      message: "Posts found",
      data: { blog, posts },
    });
  } catch (error) {
    return returnServerError(res, error);
  }
}

export async function getPostByNameIdFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.blogNameId;
    const postNameId = req.params.postNameId;

    if (!blogNameId) {
      return res.status(400).json({
        error: true,
        message: "No blog was not provided",
      });
    }

    if (!postNameId) {
      return res.status(400).json({
        error: true,
        message: "No post was not provided",
      });
    }

    const blog = await findBlogByNameId(blogNameId);

    if (!blog) {
      return res.status(400).json({
        error: true,
        message: "Could not find blog",
      });
    }

    const blogId = blog._id.toString();

    const post = await getPostFromBlogByNameId({ nameId: postNameId, blogId });

    if (!post) {
      return res.status(400).json({
        error: true,
        message: "Post not found",
      });
    }

    res.status(200).json({
      error: false,
      message: "Post found",
      data: post,
    });
  } catch (error) {
    return returnServerError(res, error);
  }
}
