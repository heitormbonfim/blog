import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";

interface BlogProps {
  children?: React.ReactNode;
}

export default function BlogPage({}: BlogProps) {
  const params = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    if (!params.nameId) {
      return redirect("/profile");
    }

    handleGetBlogPosts(params.nameId);
  }, [params.nameId]);

  async function handleGetBlogPosts(nameId: string) {
    const response = await api.getBlogPosts(nameId);

    if (response.error) {
      toast.error(response.message);
    }

    // setBlog(response.data.name);
  }

  return (
    <div>
      <h2>{params.nameId}</h2>
    </div>
  );
}
