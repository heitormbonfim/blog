import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Home</title>
        <meta aria-description="Home page for blog" />
      </Helmet>

      <main>
        <h1 className="text-2xl text-center font-bold py-5">Welcome to Blog</h1>

        <Link to="/profile">
          <Button variant="link">Profile</Button>
        </Link>

        <div className="my-10">Most recent</div>

        <div>
          <h2>Most Recent Articles</h2>
        </div>
      </main>
    </PageContainer>
  );
}
