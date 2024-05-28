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
