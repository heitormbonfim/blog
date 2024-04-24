import { Blog } from "../../redux/slices/user-slice";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setCurrentBlogToEdit } from "../../redux/slices/blog-slice";

interface BlogCardPros {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardPros) {
  const dispatch = useDispatch();

  return (
    <div className="min-h-28 w-full max-w-80 p-5 border-2 border-zinc-400 hover:border-zinc-900 hover:cursor-default duration-300 flex flex-col justify-between gap-1">
      <h2 className="font-bold text-xl">{blog.name}</h2>
      <p className="text-lg">{blog.description}</p>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            dispatch(setCurrentBlogToEdit(blog));

            const modal = document.getElementById("edit-blog") as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          variant="secondary"
        >
          Edit
        </Button>
        <Button>Enter</Button>
      </div>
    </div>
  );
}
