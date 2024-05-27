import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { incrementView, setPost } from "../../redux/slices/post-slice";
import { Button } from "../../components/ui/button";
import { setCurrentBlog } from "../../redux/slices/blog-slice";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function PostPage() {
  const post = useSelector((state: RootState) => state.post.data);
  const blog = useSelector((state: RootState) => state.blog.data);
  const [postId, setPostId] = useState<string>("");
  const params = useParams();
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const incrementViewTimer = 1000 * 10;
  const [viewProgress, setViewProgress] = useState<boolean>(false);
  const [viewCompleted, setViewCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>(null!);
  const [mouseEntered, setMouseEntered] = useState<boolean>(true);
  const date = new Date(post.createdAt)
    .toDateString()
    .split(" ")
    .map((item, idx) => {
      if (idx == 2) item += "th";
      if (idx > 0 && idx < 4) return item;
    })
    .join(" ");

  useEffect(() => {
    if (viewCompleted) return;

    if (postId != post._id) {
      window.scrollTo({ behavior: "smooth", top: 0 });
      setPostId(post._id);
    }

    if (
      Object.keys(post).length === 0 ||
      Object.keys(blog).length === 0 ||
      post.blogId !== blog._id
    ) {
      if (params.postNameId && params.blogNameId) {
        handleGetPostDataFromBlog({
          postNameId: params.postNameId,
          blogNameId: params.blogNameId,
        });
      } else {
        toast.error("Missing url parameters");
        return undefined;
      }
    } else if (!viewProgress) {
      setViewProgress(true);

      setTimer(
        setTimeout(() => {
          handleAddViewToPost({ blogId: post.blogId, nameId: post.nameId });
        }, incrementViewTimer)
      );
    }
  }, [post]);

  document.onvisibilitychange = handleVisibilityChange;

  function handleVisibilityChange() {
    document.hidden ? handleStopViewProgress() : handleStartViewProgress();
  }

  async function handleGetPostDataFromBlog({
    postNameId,
    blogNameId,
  }: {
    postNameId: string;
    blogNameId: string;
  }) {
    const response = await api.getPostFromBlog({ postNameId, blogNameId });

    if (response.error) {
      toast.error(response.message);
      return redirect("/404");
    }

    dispatch(setPost(response.data.post));
    dispatch(setCurrentBlog(response.data.blog));
  }

  async function handleAddViewToPost({ blogId, nameId }: { blogId: string; nameId: string }) {
    if (viewCompleted) return;

    const response = await api.incrementView({ blogId, nameId });

    if (response.error) {
      toast.error(response.message);
    }

    dispatch(incrementView(response.data.views));
    setViewCompleted(true);
    document.onvisibilitychange = null;
  }

  function handleStartViewProgress() {
    if (!viewProgress && !mouseEntered) {
      setViewProgress(true);
      setMouseEntered(true);

      setTimer(
        setTimeout(() => {
          handleAddViewToPost({ blogId: post.blogId, nameId: post.nameId });
        }, incrementViewTimer)
      );
    }
  }

  function handleStopViewProgress() {
    setMouseEntered(false);
    setViewProgress(false);
    clearTimeout(timer);
  }

  if (post.hidden) {
    return (
      <PageContainer navbar>
        <Helmet>
          <title>Unavailable</title>
          <meta name="description" content="post content" />
        </Helmet>

        <h2 className="text-3xl text-center font-bold my-10">Post Unavailable</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer navbar>
      <Helmet>
        <title>{post.title || ""}</title>
        <meta name="description" content="post content" />
      </Helmet>

      <div className="my-5">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <HiOutlineArrowLongLeft size={30} />
        </Button>
      </div>

      <h2 className="text-4xl lg:text-7xl text-center font-bold mb-10">{post.title}</h2>

      <h3 className="text-lg text-center italic">{post.summary}</h3>

      <div className="w-full h-full border-y-2 my-5">
        <p className="text-end underline font-semibold text-lg">{date}</p>
        <div className="tw-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="my-5 flex gap-3 justify-between">
        <div className="text-center text-lg">
          <span className="font-bold">Blog: </span>
          <Link to={`/blog/${blog.nameId}`}>
            <Button variant="link">{blog.name}</Button>
          </Link>
        </div>
        <h4 className="text-center text-lg">
          <span className="font-bold">Author:</span> {post.author}
        </h4>
      </div>

      {/* <h2 className="text-2xl font-bold">Comments</h2> */}
    </PageContainer>
  );
}
