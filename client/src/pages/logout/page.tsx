import { Link } from "react-router-dom";
import { PageContainer } from "../../components/ui/page-container";
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/slices/tokens-slice";
import { logout } from "../../redux/slices/user-slice";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthToken(""));
    dispatch(logout());
    localStorage.removeItem("auth");
  }, []);

  return (
    <PageContainer>
      <div className="relative">
        <h2 className="text-3xl text-center font-bold my-10">Logged Out</h2>

        <div className="min-h-96 w-full max-w-96 mx-auto flex flex-col justify-center items-center">
          <div className="w-full">
            <Link to="/login">
              <Button className="w-full mb-5 text-xl">Login</Button>
            </Link>

            <Link to="/register">
              <Button className="w-full text-xl">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
