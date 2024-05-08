import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components/ui/loading-screen";
import { loginSuccess, setUserDataLoading } from "../redux/slices/user-slice";
import api from "../api/requests";
import LoginPage from "../pages/login/page";

interface AuthRequiredProps {
  children?: React.ReactNode;
  allowPublicElement?: boolean;
  publicElement?: React.ReactNode;
}

export function AuthRequired({
  children,
  allowPublicElement = false,
  publicElement,
}: AuthRequiredProps) {
  const user = useSelector((state: RootState) => state.user);
  const authToken = useSelector((state: RootState) => state.tokens.authToken);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated && authToken) {
      handleUserAuthToken();
    }
  }, []);

  async function handleUserAuthToken() {
    dispatch(setUserDataLoading(true));

    const response = await api.loginWithToken();

    if (response.error) {
      redirect("/login");
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));
  }

  if (user.isAuthenticated) {
    return <>{children}</>;
  }

  if (user.isLoading) {
    return <LoadingScreen />;
  }

  if (allowPublicElement) {
    return <>{publicElement}</>;
  }

  return authToken ? <LoadingScreen /> : <LoginPage />;
}
