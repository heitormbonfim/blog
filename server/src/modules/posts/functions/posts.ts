import { Request, Response } from "express";
import { defaultServerError } from "../../../utils/server-errors";
import {
  createPost,
  getBlogPosts,
  findPostFromBlogByNameId,
  findPostsWithinRange,
  increamentPostView,
  findPostAndUpdate,
  increamentPostShare,
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

    const postAlreadyExists = await findPostFromBlogByNameId({ nameId, blogId });

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

    let blog = await findBlogByNameId(blogNameId);

    if (blog) {
      const blogId = blog._id.toString();

      findPostFromBlog({ nameId: postNameId, blogId });
    } else {
      blog = await findBlogById(blogNameId);
      findPostFromBlog({ nameId: postNameId, blogId: blogNameId });
    }

    async function findPostFromBlog({ nameId, blogId }: { nameId: string; blogId: string }) {
      const post = await findPostFromBlogByNameId({ nameId, blogId });

      if (!post) {
        return res.status(400).json({
          error: true,
          message: "Post not found",
        });
      }

      res.status(200).json({
        error: false,
        message: "Post found",
        data: { post, blog },
      });
    }
  } catch (error) {
    return defaultServerError(res, error);
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const { amount, skip } = req.query;

    const ifAmountButNotSkip = amount != "0" && skip == "0";
    const ifSkipButNotAmount = amount == "0" && skip != "0";
    const ifBothAmountAndSkip = amount != "0" && skip != "0";

    if (ifAmountButNotSkip) {
      const intAmount = parseInt(amount as string);

      const comments = await findPostsWithinRange({
        limit: intAmount,
        skip: 0,
      });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    } else if (ifSkipButNotAmount) {
      const intSkip = parseInt(amount as string);

      const comments = await findPostsWithinRange({
        skip: intSkip,
        limit: 0,
      });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    } else if (ifBothAmountAndSkip) {
      const intAmount = parseInt(amount as string);
      const intSkip = parseInt(skip as string);

      const posts = await findPostsWithinRange({ limit: intAmount, skip: intSkip });

      return res.status(200).json({
        error: false,
        message: "Posts found",
        data: posts,
      });
    }
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

export async function editPost(req: Request, res: Response) {
  try {
    const { title, summary, content, author, hidden, blog_id: blogId, post_id: postId } = req.body;
    const ownerId = req.body.user._id;

    if (!title || !summary || !content || !author || !blogId || !postId) {
      return res.status(400).json({
        error: true,
        message: "Missing data",
      });
    }

    const blog = await findBlogById(blogId);

    if (!blog) {
      return res.status(400).json({
        error: true,
        message: "Blog not found",
      });
    }

    if (blog.ownerId != ownerId) {
      return res.status(403).json({
        error: true,
        message: "Not your blog",
      });
    }

    const editedPost = await findPostAndUpdate({
      postId,
      author,
      content,
      hidden,
      summary,
      title,
    });

    if (!editedPost) {
      return res.status(400).json({
        error: true,
        message: "Post not found",
      });
    }

    res.status(200).json({
      error: false,
      message: "Post updated",
      data: editedPost,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}

export async function sharePost(req: Request, res: Response) {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        error: true,
        message: "Missing post id",
      });
    }

    const post = await increamentPostShare(postId);

    res.status(200).json({
      error: false,
      message: "Incremented share",
      data: post,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}
