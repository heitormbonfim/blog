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
import { FaCalendar, FaThumbsUp, FaUser } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { turnDateIntoMonthAndDay } from "../../utils/treat-dates";

interface Comments {
  _id: string;
  postId: string;
  userName: string;
  content: string;
  likes: string[];
  createdAt: string;
}

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
  const [comments, setComments] = useState<Comments[]>([]);
  const date = turnDateIntoMonthAndDay(post.createdAt);

  useEffect(() => {
    if (post.hidden) return;

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

    handleGetPostComments(post._id);
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

  async function handleGetPostComments(postId: string) {
    const response = await api.getPostComments({ postId });

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    setComments(response.data);
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
        <p className="text-end">
          <span className="font-semibold">{post.author}</span> <span>|</span>
          <span className="font-semibold">{date}</span>
        </p>
        <div className="tw-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div>
        <div className="flex gap-1">
          <span className="font-bold">Blog: </span>
          <Link to={`/blog/${blog.nameId}`}>
            <Button variant="link" className="flex items-center gap-1">
              <span>{blog.name}</span> <FiExternalLink size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-zinc-100 my-20 py-10 px-5">
        <h2 className="text-2xl text-center font-bold mb-10">Recommended Articles</h2>
      </div>

      <h2 className="text-2xl text-center font-bold mb-10">Comments</h2>

      {comments.length > 0 ? (
        <div className="w-full max-w-3xl mx-auto grid gap-3">
          {comments.map((comment, idx) => {
            const commentDate = turnDateIntoMonthAndDay(comment.createdAt);

            return (
              <div key={comment._id + idx} className="flex shadow-md border-2">
                <div className="w-14 p-2 flex justify-center">
                  <FaUser className="bg-zinc-300 h-10 w-10 p-2 rounded-full" />
                </div>
                <div className="grid gap-3 w-full py-2 px-2">
                  <h3 className="text-lg font-bold">{comment.userName}</h3>
                  <div>{comment.content}</div>

                  <div className="flex justify-end items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar />
                      {commentDate}
                    </span>
                    <Button variant="ghost" className="flex gap-1 items-center">
                      <FaThumbsUp />
                      <span>{comment.likes.length}</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Comments</div>
      )}
    </PageContainer>
  );
}
