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
import { PostCard } from "../../components/blog/post-card";
import { Post, setPost } from "../../redux/slices/post-slice";
import PublicBlogPage from "./public-page";
import { CircleButton } from "../../components/ui/mobile-button";
import { FaPlus } from "react-icons/fa6";

interface BlogProps {
  children?: React.ReactNode;
}

export default function BlogPage({}: BlogProps) {
  const currentBlog = useSelector((state: RootState) => state.blog.data);
  const isLoading = useSelector((state: RootState) => state.blog.isLoading);
  const user = useSelector((state: RootState) => state.user.data);
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

  if (user._id != currentBlog.ownerId) {
    return <PublicBlogPage />;
  }

  return (
    <PageContainer navbar>
      <Helmet>
        <title>{currentBlog.name || ""}</title>
        <meta name="description" content="Page to create and manage posts" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">{currentBlog.name}</h2>

      <div className="mb-5 flex justify-center">
        <Link to="/blog/editor/new" onClick={() => dispatch(setPost({} as Post))}>
          <Button className="hidden lg:inline-block">Create Post</Button>
        </Link>
      </div>

      <Link to="/blog/editor/new" onClick={() => dispatch(setPost({} as Post))}>
        <CircleButton className="lg:hidden fixed bottom-5 right-5">
          <FaPlus size={30} />
        </CircleButton>
      </Link>

      {isLoading ? (
        <div className="font-bold animate-pulse">Loading...</div>
      ) : (
        <div>
          {currentBlog.posts?.length ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {currentBlog.posts.map((post, idx) => {
                return (
                  <PostCard key={post.nameId + idx} data={post} blogNameId={currentBlog.nameId} />
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
