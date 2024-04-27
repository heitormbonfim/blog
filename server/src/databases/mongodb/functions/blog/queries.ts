import blog, { Blog } from "../../schemas/blog";

export async function createNewBlog({ name, nameId, description, ownerId }: Blog) {
  try {
    const newBlog = await blog.create({
      name,
      nameId,
      description,
      ownerId,
    });

    return newBlog;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findBlogById(_id: string) {
  try {
    const blogFound = await blog.findById(_id);

    return blogFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findBlogByNameId(nameId: string) {
  try {
    const blogFound = await blog.findOne({ nameId });

    if (!blogFound) {
      return null;
    }

    return blogFound;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findOwnerBlogs(ownerId: string) {
  try {
    const blogs = await blog.find({ ownerId });

    return blogs;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateBlogData({
  blog: blogData,
  newData,
}: {
  blog: Blog;
  newData: { name: string; description: string; nameId: string };
}) {
  try {
    const updatedBlog = await blog.findByIdAndUpdate(
      blogData._id,
      {
        name: newData.name,
        description: newData.description,
        nameId: newData.nameId,
      },
      { new: true }
    );

    return updatedBlog;
  } catch (error) {
    console.error(error);
    return null;
  }
}
