import { FaCalendar, FaComment, FaEye, FaShare } from "react-icons/fa6";
import { Post } from "../../redux/slices/post-slice";

interface PostCardProps {
  data: Post;
  onClick?: () => any;
}

export function PostCard({ data, onClick }: PostCardProps) {
  let date = new Date(data.createdAt).toDateString();
  date = date
    .split(" ")
    .map((item, idx) => {
      if (idx == 2) item += "th";
      if (idx > 0 && idx < 3) return item;
    })
    .join(" ");

  return (
    <div
      onClick={onClick}
      className="w-full min-w-80 max-w-96 border-2 duration-300 flex flex-col justify-between cursor-pointer hover:border-zinc-900"
    >
      <div className="w-full h-60 bg-zinc-400"></div>

      <div className="px-3 pt-3 w-full">
        <div>
          <h2 className="text-2xl">{data.title}</h2>
          <p className="italic">
            {data.summary.length > 80 ? data.summary.slice(0, 80) + "..." : data.summary}
          </p>
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
          <div className="flex gap-1 items-center">
            <FaCalendar />
            {date}
          </div>
        </div>
      </div>
    </div>
  );
}
