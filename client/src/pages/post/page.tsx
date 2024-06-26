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
import { FaCalendar, FaShare, FaThumbsUp, FaUser } from "react-icons/fa6";
import { turnDateIntoMonthAndDay } from "../../utils/treat-dates";
import { Textarea } from "../../components/ui/text-area";
import { AuthRequired } from "../../auth/auth-required";
import { Modal } from "../../components/ui/modal";
import { Input } from "../../components/ui/input";

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
  const [newComment, setNewComment] = useState<string>("");
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const date = turnDateIntoMonthAndDay(post.createdAt);

  useEffect(() => {
    if (post.hidden) return;

    if (viewCompleted) return;

    if (postId != post._id) {
      window.scrollTo({ behavior: "instant", top: 0 });
      setPostId(post._id);
      handleGetPostComments(post._id);
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

  useEffect(() => {
    handleGetPostComments(post._id);
  }, [skipAmount]);

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
      toast.error(response.message, { position: "bottom-right" });
      return redirect("/404");
    }

    dispatch(setPost(response.data.post));
    dispatch(setCurrentBlog(response.data.blog));
  }

  async function handleAddViewToPost({ blogId, nameId }: { blogId: string; nameId: string }) {
    if (viewCompleted) return;

    const response = await api.incrementView({ blogId, nameId });

    if (response.error) {
      toast.error(response.message, { position: "bottom-right" });
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
    const response = await api.getPostComments({ postId, amount: 20, skip: skipAmount });

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    if (comments.length == 0) {
      setComments(response.data);
    } else {
      setComments((prev) => [...prev, ...response.data]);
    }
  }

  async function handleCreateNewComment(content: string) {
    if (content.length == 0) return toast.error("Write something", { position: "bottom-right" });

    const response = await api.createNewComment({ content, postId: post._id });

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    setComments((prev) => {
      return [response.data, ...prev];
    });
    setNewComment("");

    toast.success(response.message, { position: "bottom-right" });
  }

  function handleOpenSharePostModal() {
    const modal = document.getElementById("share-post") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  function handleCopyShareLinkToClipBoard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Copied", { position: "bottom-right" });

    handleIncrementShare(post._id);
  }

  async function handleIncrementShare(postId: string) {
    const response = await api.incrementShare(postId);

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    dispatch(setPost(response.data));
  }

  async function handleLoadMorePosts() {
    setSkipAmount((prev) => prev + 20);
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

      <h3 className="text-xl text-center italic">{post.summary}</h3>

      <div className="w-full h-full border-y border-zinc-500 my-5">
        <p className="text-lg">
          <span className="font-semibold">{post.author}</span> <span>|</span>
          <span className="font-semibold">{date}</span>
        </p>
        <div className="tw-none min-h-96" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex justify-between items-end">
        <Link to={`/blog/${blog.nameId}`}>
          <Button variant="secondary" className="flex items-center gap-2">
            <span>{blog.name}</span>
          </Button>
        </Link>

        <div>
          <Modal id="share-post">
            <div className="grid gap-3">
              <h2 className="text-xl font-bold text-center">Share Link</h2>

              <Input type="text" className="w-full" readOnly value={window.location.href} />
              <form method="dialog" className="w-full">
                <Button type="submit" onClick={handleCopyShareLinkToClipBoard} className="w-full">
                  Copy Url
                </Button>
              </form>
            </div>
          </Modal>
          <Button
            id="share-post"
            variant="secondary"
            className="flex gap-2 items-center"
            onClick={handleOpenSharePostModal}
          >
            Share Post <FaShare />
          </Button>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-zinc-100 my-20 py-10 px-5">
        <h2 className="text-2xl text-center font-bold mb-10">Recommended Articles</h2>
      </div>

      <h2 className="text-2xl text-center font-bold mb-10">Comments</h2>

      <AuthRequired
        publicElement={
          <div className="text-center mb-10">
            <Link to="/login">
              <Button>Login To Comment</Button>
            </Link>
          </div>
        }
        allowPublicElement
      >
        <div className="grid gap-3 w-full max-w-3xl mb-10 mx-auto border-2 border-black p-3 bg-zinc-50">
          <label htmlFor="comment" className="font-bold text-lg">
            write a comment
          </label>
          <Textarea
            id="comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <div className="text-end">
            <Button onClick={() => handleCreateNewComment(newComment)}>Submit</Button>
          </div>
        </div>
      </AuthRequired>

      {comments.length > 0 ? (
        <div className="w-full max-w-3xl mx-auto grid gap-3">
          {comments.map((comment, idx) => {
            const commentDate = turnDateIntoMonthAndDay(comment.createdAt);

            return (
              <div key={comment._id + idx} className="flex border-2 border-black">
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
        <div className="w-full max-w-3xl mx-auto text-lg font-semibold">No Comments</div>
      )}

      {comments.length >= 20 && (
        <div className="text-center mt-10">
          <Button onClick={handleLoadMorePosts}>Load More</Button>
        </div>
      )}
    </PageContainer>
  );
}
