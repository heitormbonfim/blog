import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { useEffect, useState } from "react";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { Post } from "../../redux/slices/post-slice";
import { useDispatch } from "react-redux";
import { DisplayPosts } from "../../components/home/display-posts";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { LoadingScreen } from "../../components/ui/loading-screen";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skipAmount, setSkipAmount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetPosts();
  }, [skipAmount]);

  useEffect(() => {
    handleSetTrendingPosts();
  }, [posts]);

  async function handleGetPosts() {
    setLoading(true);
    const response = await api.getPosts({ amount: 20, skip: skipAmount });
    setLoading(false);

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    if (posts.length == 0) {
      setPosts(response.data);
    } else {
      setPosts((prev) => [...prev, ...response.data]);
    }
  }

  async function handleLoadMorePosts() {
    setSkipAmount((prev) => prev + 20);
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

    if (newArr.length >= 20) {
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

      {loading && <LoadingScreen />}

      <main>
        {trendingPosts.length > 0 && (
          <div className="py-10">
            <h2 className="text-3xl text-center font-bold my-10">Trending Articles</h2>

            <DisplayPosts posts={trendingPosts} dispatch={dispatch} />
          </div>
        )}

        <Separator />

        <div className="py-10">
          <h2 className="text-3xl text-center font-bold my-10">Recent Articles</h2>

          <DisplayPosts posts={posts} dispatch={dispatch} />

          {posts.length >= 20 && (
            <div className="text-center mt-10">
              <Button disabled={loading} onClick={handleLoadMorePosts}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>
    </PageContainer>
  );
}
