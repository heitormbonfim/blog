import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components/ui/loading-screen";
import { loginSuccess, setLoading } from "../redux/slices/user-slice";
import api from "../api/calls";
import Login from "../pages/login/page";

export function AuthRequired({ children }: { children?: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const authToken = useSelector((state: RootState) => state.tokens.authToken);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated && authToken) {
      handleUserAuthToken(authToken);
    }
  }, []);

  if (user.isAuthenticated) {
    return <>{children}</>;
  }

  if (user.isLoading) {
    return <LoadingScreen />;
  }

  async function handleUserAuthToken(token: string) {
    if (!token) return;

    dispatch(setLoading(true));

    const response = await api.loginWithToken(token);

    if (response.error) {
      redirect("/login");
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));
  }

  return authToken ? <LoadingScreen /> : <Login />;
}
