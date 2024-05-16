import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPost } from "../../redux/slices/post-slice";

export default function PostPage() {
  const post = useSelector((state: RootState) => state.post.data);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(post).length && params.postNameId && params.blogNameId) {
      handleGetPostDataFromBlog({ postNameId: params.postNameId, blogNameId: params.blogNameId });
    }
  }, [post]);

  async function handleGetPostDataFromBlog({
    postNameId,
    blogNameId,
  }: {
    postNameId: string;
    blogNameId: string;
  }) {
    const response = await api.getPostFromBlog({ postNameId, blogNameId });

    if (response.error) {
      return toast.error(response.message);
    }

    dispatch(setPost(response.data));
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
