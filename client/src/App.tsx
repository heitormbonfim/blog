import { Route, Routes } from "react-router-dom";
import { AuthRequired } from "./auth/auth-required";
import ProfilePage from "./pages/profile/page";
import HomePage from "./pages/home/page";
import Page404 from "./pages/404/page";
import LoginPage from "./pages/login/page";
import RegisterPage from "./pages/register/page";
import BlogPage from "./pages/blog/page";
import PostPage from "./pages/post/page";
import PublicBlogPage from "./pages/blog/public-page";
import PostEditor from "./pages/post/post-editor";
import Logout from "./pages/logout/page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/logout" element={<Logout />} />

      <Route
        path="/profile"
        element={
          <AuthRequired>
            <ProfilePage />
          </AuthRequired>
        }
      />

      <Route
        path="/blog/:nameId"
        element={
          <AuthRequired allowPublicElement publicElement={<PublicBlogPage />}>
            <BlogPage />
          </AuthRequired>
        }
      />

      <Route path="/blog/:blogNameId/:postNameId" element={<PostPage />} />

      <Route
        path="/blog/editor/new"
        element={
          <AuthRequired>
            <PostEditor newPost />
          </AuthRequired>
        }
      />

      <Route
        path="/blog/editor"
        element={
          <AuthRequired>
            <PostEditor />
          </AuthRequired>
        }
      />

      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
