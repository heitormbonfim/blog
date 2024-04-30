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

export default function Post() {
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
        <title>Blog | {post.nameId || ""}</title>
        <meta name="description" content="page to create post or read it only" />
      </Helmet>

      <h2>{post.nameId}</h2>

      <div>{post.content}</div>

      <div>{post.author}</div>
    </PageContainer>
  );
}
