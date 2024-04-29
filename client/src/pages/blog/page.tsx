import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setCurrentBlog } from "../../redux/slices/blog-slice";

interface BlogProps {
  children?: React.ReactNode;
}

export default function BlogPage({}: BlogProps) {
  const currentBlog = useSelector((state: RootState) => state.blog);
  const params = useParams();
  const redirect = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!params.nameId) {
      return redirect("/profile");
    }

    if (!Object.keys(currentBlog).length) {
      handleGetBlogPosts(params.nameId, true);
    } else {
      handleGetBlogPosts(params.nameId, false);
    }
  }, [params.nameId]);

  async function handleGetBlogPosts(nameId: string, getBlog: boolean) {
    const response = await api.getBlogPosts({ nameId, getBlog: getBlog ? true : false });

    if (response.error) {
      toast.error(response.message);
    }

    if (response.data.blog) {
      dispatch(setCurrentBlog(response.data.blog));
    }

    dispatch(setCurrentBlog({ ...currentBlog, posts: response.data.posts }));
  }

  return (
    <div>
      <h2>{currentBlog.name}</h2>

      <div>
        {currentBlog.posts?.length ? (
          <div>
            {currentBlog.posts.map((post, idx) => {
              return <div key={post.nameId + idx}>{post.nameId}</div>;
            })}
          </div>
        ) : (
          <div>There are no posts yet</div>
        )}
      </div>
    </div>
  );
}
