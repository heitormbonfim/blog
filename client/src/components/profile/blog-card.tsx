import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { Blog, setCurrentBlog } from "../../redux/slices/blog-slice";
import { Link } from "react-router-dom";

interface BlogCardPros {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardPros) {
  const dispatch = useDispatch();

  function handleOpenEditBlogModal() {
    dispatch(setCurrentBlog(blog));

    const modal = document.getElementById("edit-blog-modal") as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  }

  return (
    <div className="min-h-28 w-full max-w-80 p-5 border-2 border-zinc-400 hover:border-zinc-900 hover:cursor-default duration-300 flex flex-col justify-between gap-1">
      <h2 className="font-bold text-xl">{blog.name}</h2>
      <p className="text-lg">{blog.description}</p>
      <div className="flex justify-between">
        <Button onClick={handleOpenEditBlogModal} variant="secondary">
          Edit
        </Button>

        <Link to={"/blog/" + blog.nameId}>
          <Button onClick={() => dispatch(setCurrentBlog(blog))}>Enter</Button>
        </Link>
      </div>
    </div>
  );
}
