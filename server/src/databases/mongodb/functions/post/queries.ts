import post from "../../schemas/post";

export async function getBlogPosts({ blogId }: { blogId: string; amount?: number; skip?: number }) {
  try {
    const posts = post.find({ blogId }).sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPost({
  title,
  summary,
  nameId,
  blogId,
  content,
  author,
}: {
  title: string;
  summary: string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
}) {
  try {
    const newPost = await post.create({
      title,
      summary,
      nameId,
      blogId,
      content,
      author,
    });

    return newPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findPostFromBlogByNameId({
  nameId,
  blogId,
}: {
  nameId: string;
  blogId: string;
}) {
  try {
    const postFound = await post.findOne({ nameId, blogId });

    return postFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findPostsWithinRange({
  limit = 20,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}) {
  try {
    const postsFound = await post.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });

    return postsFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function increamentPostView({ blogId, nameId }: { blogId: string; nameId: string }) {
  try {
    const postFound = await post.findOneAndUpdate(
      { blogId, nameId },
      { $inc: { views: 1 } },
      { new: true }
    );

    return postFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findPostAndUpdate({
  postId,
  author,
  content,
  hidden = false,
  summary,
  title,
}: {
  postId: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  hidden?: boolean;
}) {
  try {
    const postFound = await post.findOneAndUpdate(
      { _id: postId },
      {
        title,
        summary,
        author,
        content,
        hidden,
      },
      { new: true }
    );

    return postFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}
