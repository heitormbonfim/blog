import { Request, Response } from "express";
import { defaultServerError } from "../../../utils/server-errors";
import {
  createPost,
  getBlogPosts,
  getPostFromBlogByNameId,
  getPostsWithinRange,
  increamentPostView,
} from "../../../databases/mongodb/functions/post/queries";
import { setNameIdFormat } from "../../../utils/strings-manipulation";
import { findBlogById, findBlogByNameId } from "../../../databases/mongodb/functions/blog/queries";

export async function createNewPost(req: Request, res: Response) {
  try {
    const { title, summary, blog_id: blogId, author, content } = req.body;

    if (!title || !summary || !blogId || !author || !title || !content) {
      return res.status(400).json({
        error: true,
        message: "Missing important data",
      });
    }

    const blog = await findBlogById(blogId);

    if (!blog) {
      return res.status(400).json({
        error: true,
        message: "Blog not found",
      });
    }

    if (blog.ownerId != req.body.user._id) {
      return res.status(403).json({
        error: true,
        message: "Not your blog",
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
    return defaultServerError(res, error);
  }
}

export async function getPostsFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.blogNameId;

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
    return defaultServerError(res, error);
  }
}

export async function getPostByNameIdFromBlog(req: Request, res: Response) {
  try {
    const blogNameId = req.params.blogNameId;
    const postNameId = req.params.postNameId;

    const blog = await findBlogByNameId(blogNameId);

    if (blog) {
      const blogId = blog._id.toString();

      findBlog({ nameId: postNameId, blogId });
    } else {
      findBlog({ nameId: postNameId, blogId: blogNameId });
    }

    async function findBlog({ nameId, blogId }: { nameId: string; blogId: string }) {
      const post = await getPostFromBlogByNameId({ nameId, blogId });

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
    }
  } catch (error) {
    return defaultServerError(res, error);
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const { amount, skip } = req.query;

    if (amount && !skip) {
      return res.status(200).json({
        error: false,
        message: "Amount",
      });
    } else if (!amount && skip) {
      return res.status(200).json({
        error: false,
        message: "Skip",
      });
    } else if (amount && skip) {
      return res.status(200).json({
        error: false,
        message: "Amount and Skip",
      });
    }

    const posts = await getPostsWithinRange({});

    return res.status(200).json({
      error: false,
      message: "Posts found",
      data: posts,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}

export async function addViewToPost(req: Request, res: Response) {
  try {
    const { blog_id: blogId, name_id: nameId } = req.body;

    if (!blogId || !nameId) {
      return res.status(400).json({
        error: true,
        message: "Missing data",
      });
    }

    const updatedPost = await increamentPostView({ blogId, nameId });

    if (!updatedPost) {
      return res.status(400).json({
        error: true,
        message: "Post not found",
      });
    }

    res.status(200).json({
      error: false,
      message: "View incremented",
      data: updatedPost,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}
