import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { useEffect, useState } from "react";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { Post } from "../../redux/slices/post-slice";
import { useDispatch } from "react-redux";
import { DisplayPosts } from "../../components/home/display-posts";
import { Separator } from "../../components/ui/separator";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetPosts();
  }, []);

  useEffect(() => {
    handleSetTrendingPosts();
  }, [posts]);

  async function handleGetPosts() {
    setLoading(true);
    const response = await api.getPosts({});
    setLoading(false);

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    setPosts(response.data);
  }

  async function handleSetTrendingPosts() {
    let newArr = [...posts];
    newArr.sort((a, b) => {
      if (a.views > b.views) {
        return -1;
      } else {
        return 1;
      }
    });

    if (newArr.length <= 20) {
      newArr = newArr.filter((item, idx) => {
        if (idx < 5 && item.views > 10 && !item.hidden) {
          const now = new Date();
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          const postDate = new Date(item.createdAt);

          if (postDate >= sevenDaysAgo) return item;
        }
      });
    }

    setTrendingPosts(newArr);
  }

  return (
    <PageContainer navbar>
      <Helmet>
        <title>Blog</title>
        <meta aria-description="Home page for blog" />
      </Helmet>

      <main>
        {trendingPosts.length > 0 && (
          <div className="my-10">
            <h2 className="text-3xl text-center font-bold my-10">Trending Articles</h2>

            <DisplayPosts posts={trendingPosts} loading={loading} dispatch={dispatch} />
          </div>
        )}

        <Separator />

        <div className="my-10">
          <h2 className="text-3xl text-center font-bold my-10">Recent Articles</h2>

          <DisplayPosts posts={posts} loading={loading} dispatch={dispatch} />
        </div>
      </main>
    </PageContainer>
  );
}
