import { Request, Response } from "express";
import { defaultServerError } from "../../../../utils/server-errors";
import {
  createNewComment,
  findCommentsFromPost,
} from "../../../../databases/mongodb/functions/comment/queries";
import { User } from "../../../../databases/mongodb/schemas/user";

export async function createComment(req: Request, res: Response) {
  try {
    const { post_id: postId, content } = req.body;
    const user: User = req.body.user;
    const userName = user.name.first + " " + user.name.last;

    if (!postId || !content) {
      return res.status(400).json({
        error: true,
        message: "Missing important data",
      });
    }

    const newComment = await createNewComment({ postId, content, userName });

    res.status(201).json({
      error: false,
      message: "Comment created",
      data: newComment,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}

export async function getCommentsFromPostWithinRange(req: Request, res: Response) {
  try {
    const { id, amount, skip } = req.query;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Missing post id",
      });
    }

    const postId = id.toString();

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

    const comments = await findCommentsFromPost({ id: postId });

    res.status(200).json({
      error: false,
      message: "Comments found",
      data: comments,
    });
  } catch (error) {
    return defaultServerError(res, error);
  }
}
export async function likeComment() {}
export async function deleteComment() {}
