import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { Post } from "../../redux/slices/post-slice";
import { PostCard } from "../../components/ui/post-card";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      return toast.error(response.message);
    }

    setPosts(response.data);
  }

  async function handleSetTrendingPosts() {
    let newArr = [...posts];
    newArr = newArr.sort((a, b) => {
      if (String(a.likes) < String(b.likes)) {
        return -1;
      } else {
        return 1;
      }
    });

    newArr = newArr.filter((item, idx) => {
      if (idx < 5) {
        return item;
      }
    });

    setTrendingPosts(newArr);
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Blog</title>
        <meta aria-description="Home page for blog" />
      </Helmet>

      <main>
        <h1 className="text-2xl text-center font-bold py-5">Welcome to Blog</h1>

        <Link to="/profile">
          <Button variant="link">Profile</Button>
        </Link>

        <div className="my-10">
          <h2 className="text-2xl text-center mb-5">Trending Articles</h2>
          {loading ? (
            <div>loading...</div>
          ) : (
            <div>
              {posts.length && (
                <div className="grid gap-3">
                  {posts.map((post, idx) => {
                    return (
                      <div key={post._id + idx}>
                        <PostCard data={post} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="py-10">
          <h2 className="text-2xl text-center mb-5">Recent Articles</h2>

          {loading ? (
            <div>loading...</div>
          ) : (
            <div>
              {posts.length && (
                <div className="grid gap-3">
                  {posts.map((post, idx) => {
                    return (
                      <div key={post._id + idx}>
                        <PostCard data={post} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </PageContainer>
  );
}
