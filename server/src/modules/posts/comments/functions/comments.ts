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

    const ifAmountButNotSkip = amount != "0" && skip == "0";
    const ifSkipButNotAmount = amount == "0" && skip != "0";
    const ifBothAmountAndSkip = amount != "0" && skip != "0";

    const postId = id.toString();

    if (ifAmountButNotSkip) {
      const intAmount = parseInt(amount as string);

      const comments = await findCommentsFromPost({
        id: postId,
        amount: intAmount,
        skip: 0,
      });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    } else if (ifSkipButNotAmount) {
      const intSkip = parseInt(amount as string);

      const comments = await findCommentsFromPost({
        id: postId,
        skip: intSkip,
        amount: 0,
      });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    } else if (ifBothAmountAndSkip) {
      const intAmount = parseInt(amount as string);
      const intSkip = parseInt(skip as string);

      const comments = await findCommentsFromPost({
        id: postId,
        amount: intAmount,
        skip: intSkip,
      });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    } else {
      const comments = await findCommentsFromPost({ id: postId, amount: 20, skip: 0 });

      return res.status(200).json({
        error: false,
        message: "Comments found",
        data: comments,
      });
    }
  } catch (error) {
    return defaultServerError(res, error);
  }
}
export async function likeComment() {}
export async function deleteComment() {}
