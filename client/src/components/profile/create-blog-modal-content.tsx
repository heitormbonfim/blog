import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/text-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "react-toastify";
import api from "../../api/calls";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface BlogData {
  name: string;
  description: string;
  ownerId: string;
}

export function CreateBlogModalContent() {
  const ownerId = useSelector((state: RootState) => state.user.data._id);
  const [blogData, setBlogData] = useState<BlogData>({ ownerId } as BlogData);

  async function handleCreateBlog({ name, description, ownerId }: BlogData) {
    if (!name || !description || !ownerId) return toast.error("Missing Data");

    const response = await api.createBlog(blogData);

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(`Blog ${name} created`);
  }

  return (
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
          <Button type="submit" onClick={() => handleCreateBlog(blogData)}>
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}