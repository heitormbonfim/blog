import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import { AuthRequired } from "./auth/AuthRequired";
import Profile from "./pages/profile/page";
import Home from "./pages/home/page";
import Page404 from "./pages/404/page";
import Login from "./pages/login/page";
import Register from "./pages/register/page";

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

        <Route path="/" element={<Home />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
