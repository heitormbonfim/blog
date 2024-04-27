import post from "../../schemas/post";

export async function getPosts({
  blogNameId,
}: {
  blogNameId: string;
  amount?: number;
  skip?: number;
}) {
  try {
    const posts = post.find({ blogId: blogNameId });

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPost({
  nameId,
  blogNameId,
  content,
  author,
}: {
  nameId: string;
  blogNameId: string;
  content: string;
  author: string;
}) {
  try {
    const newPost = await post.create({
      nameId,
      blogId: blogNameId,
      content,
      author,
    });

    return newPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}
