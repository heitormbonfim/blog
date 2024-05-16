import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginSuccess, setUserDataLoading } from "../../redux/slices/user-slice";
import api from "../../api/requests";
import { setAuthToken } from "../../redux/slices/tokens-slice";
import { Helmet } from "react-helmet";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

interface InputData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [input, setInput] = useState<InputData>({} as InputData);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  async function handleLogin({ email, password }: InputData) {
    if (!email || !password) return;

    dispatch(setUserDataLoading(true));

    const response = await api.login({ email, password });

    if (response.error) {
      dispatch(setUserDataLoading(false));
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));

    localStorage.setItem("auth", response.data.token);

    dispatch(setAuthToken(response.data.token));

    toast.success("Logged In");

    redirect("/profile");
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page to sign in to profile" />
      </Helmet>

      <div className="w-full h-screen flex">
        <div className="w-full flex items-center justify-center py-12">
          <div className="mx-auto grid w-full max-w-[450px] gap-6 border border-zinc-950 p-5">
            <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={input.email || ""}
                  onChange={(event) =>
                    setInput((prev) => {
                      return { ...prev, email: event.target.value };
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label htmlFor="password">Password</label>
                  {/* <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  value={input.password || ""}
                  onChange={(event) =>
                    setInput((prev) => {
                      return { ...prev, password: event.target.value };
                    })
                  }
                  required
                />
              </div>
              <Button type="submit" className="my-4" onClick={() => handleLogin(input)}>
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:block bg-zinc-200"></div>
      </div>
    </>
  );
}
