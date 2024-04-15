import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/page";
import Home from "./pages/home/page";
import Page404 from "./pages/404/page";
import Register from "./pages/register/page";
import { ThemeProvider } from "./contexts/theme-provider";
import Profile from "./pages/profile/page";
import { AuthRequired } from "./auth/auth-required";

function App() {
  return (
    <ThemeProvider>
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

        <Route
          path="/settings"
          element={
            <AuthRequired>
              <Profile />
            </AuthRequired>
          }
        />

        <Route path="/" element={<Home />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
