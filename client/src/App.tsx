import { Route, Routes } from "react-router-dom";
import { AuthRequired } from "./auth/AuthRequired";
import Profile from "./pages/profile/page";
import Home from "./pages/home/page";
import Page404 from "./pages/404/page";
import Login from "./pages/login/page";
import Register from "./pages/register/page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <AuthRequired>
            <Profile />
          </AuthRequired>
        }
      />

      <Route path="/" element={<Home />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
