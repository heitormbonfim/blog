import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/text-area";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";

interface PostData {
  title: string;
  summary: string;
  author: string;
  content: string;
  blogId: string;
}

export default function PostCreation() {
  const currentblog = useSelector((state: RootState) => state.blog.data);
  const [postData, setPostData] = useState<PostData>({} as PostData);
  const redirect = useNavigate();

  useEffect(() => {
    if (!currentblog._id) {
      redirect("/profile");
    } else {
      setPostData((prev) => {
        return {
          ...prev,
          blogId: currentblog._id,
        };
      });
    }
  }, []);

  async function handleCreateNewPost() {
    const response = await api.createNewPost(postData);

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
  }

  if (!currentblog._id) {
    return (
      <PageContainer>
        <h2 className="text-3xl text-center font-bold my-10">Oops! you must select one blog</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Post Creation</title>
        <meta name="description" content="page dedicated to posts creation" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">New Post</h2>
      <form onSubmit={handleCreateNewPost}>
        <div className="grid gap-3">
          <div className="grid">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={postData.title || ""}
              onChange={(event) =>
                setPostData((prev) => {
                  return {
                    ...prev,
                    title: event.target.value,
                  };
                })
              }
              required
            />
          </div>

          <div className="grid">
            <label htmlFor="summary" className="font-bold">
              Summary
            </label>
            <Input
              id="summary"
              value={postData.summary || ""}
              onChange={(event) =>
                setPostData((prev) => {
                  return {
                    ...prev,
                    summary: event.target.value,
                  };
                })
              }
              type="text"
              required
            />
          </div>

          <div className="grid">
            <label htmlFor="author" className="font-bold">
              Author
            </label>
            <Input
              id="author"
              type="text"
              value={postData.author || ""}
              onChange={(event) =>
                setPostData((prev) => {
                  return {
                    ...prev,
                    author: event.target.value,
                  };
                })
              }
              required
            />
          </div>

          <div className="grid">
            <label htmlFor="content" className="font-bold">
              Content
            </label>
            <Textarea
              id="content"
              value={postData.content || ""}
              onChange={(event) =>
                setPostData((prev) => {
                  return {
                    ...prev,
                    content: event.target.value,
                  };
                })
              }
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit">Create Post</Button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}
