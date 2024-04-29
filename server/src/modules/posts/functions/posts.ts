import { Request, Response } from "express";
import { returnServerError } from "../../../utils/server-errors";
import {
  createPost,
  getBlogPosts,
  getPostFromBlogByNameId,
} from "../../../databases/mongodb/functions/post/queries";
import { setNameIdFormat } from "../../../utils/strings-manipulation";
import { findBlogByNameId } from "../../../databases/mongodb/functions/blog/queries";
import { Blog } from "../../../databases/mongodb/schemas/blog";

export async function createNewPost(req: Request, res: Response) {
  try {
    const { blog_name_id: blogNameId, author, title, content } = req.body;

    if (!blogNameId || !author || !title || !content) {
      return res.status(400).json({
        error: true,
        message: "Missing important data",
      });
    }

    const nameId = setNameIdFormat(title);

    const postAlreadyExists = await getPostFromBlogByNameId({ nameId, blogNameId });

    if (postAlreadyExists) {
      return res.status(403).json({
        error: true,
        message: "Post already exists",
      });
    }

    const post = await createPost({ author, content, nameId, blogNameId });

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
    let getBlog: string | boolean | undefined = req.header("get-blog");

    if (getBlog == "true") {
      getBlog = true;
    } else if (getBlog == "false") {
      getBlog = false;
    } else {
      getBlog = false;
    }

    if (!blogNameId) {
      res.status(400).json({
        error: true,
        message: "No blog host provided",
      });
    }

    let blog: Blog | null = {} as Blog;

    if (getBlog) {
      blog = await findBlogByNameId(blogNameId);
    }

    const posts = await getBlogPosts({ blogNameId });

    res.status(200).json({
      error: false,
      message: "Posts found",
      data: blog ? { blog, posts } : { posts },
    });
  } catch (error) {
    return returnServerError(res, error);
  }
}

export async function getPostByNameIdFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.blogNameId;
    const postNameId = req.params.postNameId;

    console.log({ blogNameId, postNameId });

    if (!blogNameId) {
      return res.status(400).json({
        error: true,
        message: "No blog id was provided",
      });
    }

    if (!postNameId) {
      return res.status(400).json({
        error: true,
        message: "No post id was provided",
      });
    }

    const post = await getPostFromBlogByNameId({ nameId: postNameId, blogNameId });

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
