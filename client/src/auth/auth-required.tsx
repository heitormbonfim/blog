import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FullScreenLoading from "@/components/ui/full-screen-loading";
import api, { authToken } from "@/services/requests";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "@/redux/slices/user/users-slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthRequired({ children }: { children?: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      handleUserAuthToken(authToken);
    }
  }, []);

  if (user.isAuthenticated) {
    return <>{children}</>;
  }

  async function handleUserAuthToken(token: string) {
    if (!token) return;

    dispatch(setLoading());

    const response = await api.loginWithToken(token);

    if (response.error) {
      redirect("/login");
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));
  }

  return <FullScreenLoading />;
}
