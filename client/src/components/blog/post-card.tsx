import { FaComment, FaEye, FaEyeSlash, FaPen, FaShare, FaTrash } from "react-icons/fa6";
import { Post, setPost } from "../../redux/slices/post-slice";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "../ui/modal";
import api from "../../api/requests";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCurrentBlog } from "../../redux/slices/blog-slice";

interface PostCardProps {
  data: Post;
  onClick?: () => any;
  blogNameId?: string;
}

export function PostCard({ data, blogNameId, onClick }: PostCardProps) {
  const dispatch = useDispatch();
  const currentBlog = useSelector((state: RootState) => state.blog.data);

  function handleOpenDeletePostModal() {
    const modal = document.getElementById(`delete-${data._id}`) as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  }

  async function handleDeletePost(postId: string) {
    const response = await api.deletePost(postId);

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    const filteredPosts = currentBlog.posts?.filter((post) => post._id !== data._id);

    dispatch(setCurrentBlog({ ...currentBlog, posts: filteredPosts }));

    toast.success("Post deleted", { position: "bottom-right" });
  }

  return (
    <div
      onClick={onClick}
      className={`w-full border-2 ${
        data.hidden && "border-red-500"
      } duration-300 flex flex-col justify-between`}
    >
      <div className="w-full min-h-60 bg-zinc-400"></div>

      <div className="px-3 pt-3 flex flex-col justify-between h-full">
        <div>
          <Link to={`/blog/${blogNameId ? blogNameId : data.blogId}/${data.nameId}`}>
            <h2 className="text-2xl hover:underline">{data.title}</h2>
          </Link>
          <p className="italic">{data.summary}</p>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              {data.hidden ? <FaEyeSlash /> : <FaEye />}
              {data.views}
            </div>

            <div className="flex gap-1 items-center">
              <FaComment />
              {data.comments}
            </div>

            <div className="flex gap-1 items-center">
              <FaShare />
              {data.shares}
            </div>
          </div>

          <div className="flex gap-3">
            <Link to={`/blog/${blogNameId ? blogNameId : data.blogId}/${data.nameId}`}>
              <Button onClick={() => dispatch(setPost(data))}>
                {data.hidden ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </Link>

            <Link to="/blog/editor" onClick={() => dispatch(setPost(data))}>
              <Button>
                <FaPen />
              </Button>
            </Link>
            <Button className="h-fit" onClick={handleOpenDeletePostModal}>
              <FaTrash />
            </Button>
          </div>

          <Modal id={`delete-${data._id}`}>
            <h2 className="text-xl font-bold text-center text-500 mb-10">DELETE POST</h2>

            <h3 className="text-lg text-center text-red-500 mb-10">
              Are you sure you want to delete {data.title}?
              <br />
              There's no way back
            </h3>

            <form method="dialog" className="flex justify-center items-center gap-3">
              <Button type="submit" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" onClick={() => handleDeletePost(data._id)}>
                Confirm
              </Button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
