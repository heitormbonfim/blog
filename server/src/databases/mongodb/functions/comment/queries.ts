import comment from "../../schemas/comments";

export async function createNewComment({
  postId,
  userName,
  content,
}: {
  postId: string;
  userName: string;
  content: string;
}) {
  try {
    const newComment = await comment.create({
      postId,
      userName,
      content,
    });

    return newComment;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findCommentsFromPost({
  id,
  amount = 20,
  skip = 0,
}: {
  id: string;
  amount?: number;
  skip?: number;
}) {
  try {
    const comments = await comment.find({ postId: id }).skip(skip).limit(amount);

    return comments;
  } catch (error) {
    console.error(error);
    return null;
  }
}
