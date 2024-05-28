import { Request, Response } from "express";
import { defaultServerError } from "../../../../utils/server-errors";
import { createNewComment } from "../../../../databases/mongodb/functions/comment/queries";
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

export async function getCommentsFromPostWithinRange() {}
export async function likeComment() {}
export async function deleteComment() {}
