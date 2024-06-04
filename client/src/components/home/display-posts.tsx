import { Dispatch } from "redux";
import { Post, setPost } from "../../redux/slices/post-slice";
import { Link } from "react-router-dom";
import { PostCard } from "../ui/post-card";

interface DisplayPostsProps {
  posts: Post[];
  dispatch: Dispatch;
}

export function DisplayPosts({ posts, dispatch }: DisplayPostsProps) {
  return (
    <div>
      <div>
        {posts.length && (
          <div className="w-full grid gap-3 justify-center md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => {
              if (post.hidden) return null;

              return (
                <Link key={post._id + idx} to={`/blog/${post.blogId}/${post.nameId}`}>
                  <PostCard data={post} onClick={() => dispatch(setPost(post))} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
