import { Request, Response } from "express";
import { returnServerError } from "../../../utils/server-errors";
import { setNameFormat, setNameIdFormat } from "../../../utils/strings-manipulation";
import { findUserById } from "../../../databases/mongodb/functions/user/queries";
import {
  createNewBlog,
  findBlogById,
  findBlogByNameId,
  findOwnerBlogs,
  updateBlogData,
} from "../../../databases/mongodb/functions/blog/queries";

export async function createBlog(req: Request, res: Response) {
  try {
    const { name, description } = req.body;
    const ownerId = req.body.user._id;

    if (!name || !description) {
      return res.status(400).json({
        error: true,
        message: "Missing important data",
      });
    }

    if (ownerId.length > 1000) {
      return res.status(400).json({
        error: true,
        message: "Owner Id invalid",
      });
    }

    if (name.length > 100) {
      return res.status(400).json({
        error: true,
        message: "Blog name 100 characters length exceeded",
      });
    }

    if (description.length > 10_000) {
      return res.status(400).json({
        error: true,
        message: "Blog description 10.000 characters length exceeded",
      });
    }

    const owner = await findUserById(ownerId);

    if (!owner) {
      return res.status(400).json({
        error: true,
        message: "Owner not found",
      });
    }

    const blogNameFormatted = setNameFormat(name);
    const nameId = setNameIdFormat(name);

    const blogAlreadyExists = await findBlogByNameId(nameId);

    if (blogAlreadyExists) {
      return res.status(403).json({
        error: true,
        message: "Blog already exists",
      });
    }

    const newBlog = await createNewBlog({
      name: blogNameFormatted,
      nameId,
      description,
      ownerId,
    });

    if (!newBlog) {
      throw Error("Error on creating blog\n");
    }

    res.status(201).json({
      error: false,
      message: "New blog created",
      data: newBlog,
    });
  } catch (error) {
    returnServerError(res, error);
  }
}

export async function getBlogs(req: Request, res: Response) {
  try {
    const ownerId = req.body.user._id;

    const blogs = await findOwnerBlogs(ownerId);

    res.status(200).json({
      error: false,
      message: "Blogs found",
      data: blogs,
    });
  } catch (error) {
    returnServerError(res, error);
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const { name, description, _id } = req.body;
    const user = req.body.user;

    const blog = await findBlogById(_id);

    if (!blog) {
      return res.status(400).json({
        error: true,
        message: "Blog not found",
      });
    }

    if (blog.ownerId != user._id) {
      return res.status(403).json({
        error: true,
        message: "This blog doesn't belong to you",
      });
    }

    const newNameId = setNameIdFormat(name);

    const alreadyExistsNameId = await findBlogByNameId(newNameId);

    if (alreadyExistsNameId) {
      return res.status(403).json({
        error: true,
        message: "Blog name already exists",
      });
    }

    const updatedBlog = await updateBlogData({
      blog,
      newData: { name, description, nameId: newNameId },
    });

    if (!updatedBlog) {
      return res.status(500).json({
        error: true,
        message: "Blog could not be updated",
      });
    }

    res.status(200).json({
      error: false,
      message: "Blog data updated",
      data: updatedBlog,
    });
  } catch (error) {
    returnServerError(res, error);
  }
}

export async function deleteBlog() {}
