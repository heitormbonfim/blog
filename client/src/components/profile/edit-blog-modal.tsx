import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/text-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import api from "../../api/calls";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/user-slice";

interface BlogData {
  _id: string;
  name: string;
  description: string;
}

export default function EditBlogModal() {
  const currentBlogToEdit = useSelector((state: RootState) => state.blog);
  const blogs = useSelector((state: RootState) => state.user.data.blogs);
  const [blogData, setBlogData] = useState<BlogData>({} as BlogData);
  const dispatch = useDispatch();

  useEffect(() => {
    setBlogData((prev) => {
      return {
        ...prev,
        _id: currentBlogToEdit._id,
        name: currentBlogToEdit.name,
        description: currentBlogToEdit.description,
      };
    });
  }, [currentBlogToEdit]);

  async function handleEditBlog(blog: BlogData) {
    const response = await api.updateBlog({
      _id: blog._id,
      name: blog.name,
      description: blog.description,
    });

    if (response.error) {
      return toast.error(response.message);
    }

    let newArrOfBlogs = [...blogs];
    let blogToUpdate = newArrOfBlogs.findIndex((item) => item._id == blog._id);
    newArrOfBlogs[blogToUpdate] = response.data;

    dispatch(setBlogs(newArrOfBlogs));
    toast.success(response.message);
  }

  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-2 w-full max-w-60">
          <label htmlFor="new-blog-name" className="font-bold">
            Blog Name
          </label>
          <Input
            id="new-blog-name"
            type="text"
            placeholder="My Blog Name"
            value={blogData.name || ""}
            onChange={(event) =>
              setBlogData((prev) => {
                return { ...prev, name: event.target.value };
              })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="new-blog-description" className="font-bold">
            Blog Description
          </label>

          <Textarea
            placeholder="A blog about how to create a blog by coding and by clicking the element create blog"
            id="new-blog-description"
            value={blogData.description || ""}
            onChange={(event) =>
              setBlogData((prev) => {
                return { ...prev, description: event.target.value };
              })
            }
            required
          />
        </div>

        <Separator className="mt-5" />

        <div className="flex justify-end">
          <form method="dialog">
            <Button type="submit" onClick={() => handleEditBlog(blogData)}>
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
