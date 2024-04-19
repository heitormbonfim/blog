import { Helmet } from "react-helmet";
import { PageContainer } from "../../components/ui/page-container";

export default function Home() {
  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Home</title>
        <meta aria-description="Home page for blog" />
      </Helmet>

      <main>
        <h1 className="text-2xl text-center font-bold py-5">Welcome to Blog</h1>

        <div className="my-10">Most recent</div>

        <div>
          <h2>Most Recent Articles</h2>
        </div>
      </main>
    </PageContainer>
  );
}
