import post from "../../schemas/post";

export async function getBlogPosts({
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

export async function getPostFromBlogByNameId({
  nameId,
  blogNameId,
}: {
  nameId: string;
  blogNameId: string;
}) {
  try {
    const postFound = await post.findOne({ nameId, blogId: blogNameId });

    return postFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}
