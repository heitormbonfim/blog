import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { incrementView, setPost } from "../../redux/slices/post-slice";

export default function PostPage() {
  const post = useSelector((state: RootState) => state.post.data);
  const params = useParams();
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const incrementViewTimer = 1000 * 3;
  const [viewProgress, setViewProgress] = useState<boolean>(false);
  const [viewCompleted, setViewCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>(null!);
  const [mouseEntered, setMouseEntered] = useState<boolean>(true);

  useEffect(() => {
    if (viewCompleted) return;

    if (!Object.keys(post).length && params.postNameId && params.blogNameId) {
      handleGetPostDataFromBlog({ postNameId: params.postNameId, blogNameId: params.blogNameId });
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

    dispatch(setPost(response.data));
  }

  async function handleAddViewToPost({ blogId, nameId }: { blogId: string; nameId: string }) {
    if (viewCompleted) return;

    const response = await api.incrementView({ blogId, nameId });

    if (response.error) {
      toast.error(response.message);
    }

    dispatch(incrementView(response.data.views));
    setViewCompleted(true);
    toast("view completed");
    document.onvisibilitychange = null;
  }

  function handleStartViewProgress() {
    if (!viewProgress && !mouseEntered) {
      toast("view continued");
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
    toast("view stopped");
  }

  return (
    <PageContainer>
      <Helmet>
        <title>{post.title || ""}</title>
        <meta name="description" content="page to create post or read it only" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">{post.title}</h2>

      <h3 className="text-lg text-center italic">{post.summary}</h3>

      <div className="w-full h-full border-y-2 my-5">
        <div className="tw-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="my-5">
        <h4 className="text-center text-lg font-bold">By {post.author}</h4>
      </div>

      {/* <h2 className="text-2xl font-bold">Comments</h2> */}
    </PageContainer>
  );
}
