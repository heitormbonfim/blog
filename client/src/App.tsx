import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/page";
import Home from "./pages/home/page";
import NotFound404 from "./pages/404/page";
import Register from "./pages/register/page";
import { ThemeProvider } from "./contexts/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
