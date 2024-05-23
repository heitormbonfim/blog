import { FaComment, FaEye, FaPen, FaShare, FaTrash } from "react-icons/fa6";
import { Post, setPost } from "../../redux/slices/post-slice";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

interface PostCardProps {
  data: Post;
  onClick?: () => any;
  blogNameId?: string;
}

export function PostCard({ data, blogNameId, onClick }: PostCardProps) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={onClick}
      className="w-full px-3 border-2 duration-300 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl">{data.title}</h2>
        <p className="italic">{data.summary}</p>
      </div>

      <div className="flex justify-between items-center py-2">
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <FaEye />
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
              <FaEye />
            </Button>
          </Link>

          <Link to="/blog/editor" onClick={() => dispatch(setPost(data))}>
            <Button>
              <FaPen />
            </Button>
          </Link>
          <Button className="h-fit opacity-50" disabled>
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}
