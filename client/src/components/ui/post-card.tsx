import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa6";
import { Post } from "../../redux/slices/post-slice";

interface PostCardProps {
  data: Post;
}

export function PostCard({ data }: PostCardProps) {
  return (
    <div className="w-full px-3 border-2">
      <h2 className="text-2xl">{data.title}</h2>
      <p className="italic">{data.summary}</p>
      <div className="flex gap-3 justify-end">
        <div className="flex gap-1 items-center">
          <FaThumbsUp />
          {data.likes}
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
    </div>
  );
}
