import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setBlogDataLoading, setCurrentBlog } from "../../redux/slices/blog-slice";
import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";

import { PostCard } from "../../components/ui/post-card";

interface BlogProps {
  children?: React.ReactNode;
}

export default function PublicBlogPage({}: BlogProps) {
  const currentBlog = useSelector((state: RootState) => state.blog.data);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const params = useParams();
  const redirect = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!params.nameId) {
      return redirect("/profile");
    }

    handleGetBlogPosts(params.nameId);
  }, [params.nameId]);

  async function handleGetBlogPosts(blogId: string) {
    dispatch(setBlogDataLoading(true));
    const response = await api.getBlogPosts(blogId);
    dispatch(setBlogDataLoading(false));

    if (response.error) {
      toast.error(response.message);
    }

    if (Object.keys(response.data.blog).length) {
      dispatch(setCurrentBlog({ ...response.data.blog, posts: response.data.posts }));
    } else {
      dispatch(setCurrentBlog({ ...currentBlog, posts: response.data.posts }));
    }
  }

  return (
    <PageContainer navbar>
      <Helmet>
        <title>{currentBlog.name || ""}</title>
        <meta name="description" content="Page to create and manage posts" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">{currentBlog.name}</h2>

      {isLoading ? (
        <div className="font-bold animate-pulse">Loading...</div>
      ) : (
        <div>
          {currentBlog.posts?.length ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {currentBlog.posts.map((post, idx) => {
                if (post.hidden) return null;

                return (
                  <Link to={`/blog/${currentBlog.nameId}/${post.nameId}`}>
                    <PostCard key={post.nameId + idx} data={post} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div>There are no posts yet</div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
