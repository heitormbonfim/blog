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
import { Button } from "../../components/ui/button";
import { setPost } from "../../redux/slices/post-slice";

interface BlogProps {
  children?: React.ReactNode;
}

export default function BlogPage({}: BlogProps) {
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

  async function handleGetBlogPosts(nameId: string) {
    dispatch(setBlogDataLoading(true));
    const response = await api.getBlogPosts(nameId);
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
    <PageContainer>
      <Helmet>
        <title>{currentBlog.name || ""}</title>
        <meta name="description" content="Page to create and manage posts" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">{currentBlog.name}</h2>

      <div className="mb-5 flex justify-center">
        <Link to="/post/new">
          <Button className="hidden lg:inline-block">Create Post</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="font-bold animate-pulse">Loading...</div>
      ) : (
        <div>
          {currentBlog.posts?.length ? (
            <div>
              {currentBlog.posts.map((post, idx) => {
                return (
                  <div key={post.nameId + idx}>
                    <Link to={`/blog/${currentBlog.nameId}/${post.nameId}`}>
                      <Button
                        variant="link"
                        className="text-xl mb-2"
                        onClick={() => {
                          dispatch(setPost(post));
                        }}
                      >
                        {post.nameId}
                      </Button>
                    </Link>
                  </div>
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
