import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/text-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "react-toastify";
import api from "../../api/requests";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/user-slice";

export interface BlogData {
  name: string;
  description: string;
}

export function CreateBlogModal() {
  const user = useSelector((state: RootState) => state.user.data);
  const [blogData, setBlogData] = useState<BlogData>({} as BlogData);
  const dispatch = useDispatch();

  async function handleCreateBlog({ name, description }: BlogData) {
    if (!name || !description) return toast.error("Missing Data");

    const response = await api.createBlog(blogData);

    if (response.error) {
      return toast.error(response.message);
    }

    dispatch(setBlogs([...user.blogs, response.data]));
    setBlogData({} as BlogData);
    toast.success(`Blog ${name} created`);
  }

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold text-center">Create New Blog</h2>

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
          <Button type="submit" onClick={() => handleCreateBlog(blogData)}>
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}
