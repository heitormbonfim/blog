import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginSuccess, setLoading } from "../../redux/slices/user-slice";
import api from "../../api/calls";
import { setAuthToken } from "../../redux/slices/tokens-slice";
import { Helmet } from "react-helmet";
import { FaImage } from "react-icons/fa";

interface InputData {
  email: string;
  password: string;
}

export default function Login() {
  const [input, setInput] = useState<InputData>({} as InputData);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  async function handleLogin({ email, password }: InputData) {
    if (!email || !password) return;

    dispatch(setLoading(true));

    const response = await api.login({ email, password });

    if (response.error) {
      dispatch(setLoading(false));
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));

    dispatch(setAuthToken(response.data.token));

    localStorage.setItem("auth", response.data.token);

    toast.success("Logged In");

    redirect("/profile");
  }
  return (
    <>
      <Helmet>
        <title>Blog | Login</title>
        <meta name="description" content="Login into the blog" />
      </Helmet>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
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
                <input
                  id="password"
                  type="password"
                  value={input.password || ""}
                  onChange={(event) =>
                    setInput((prev) => {
                      return { ...prev, password: event.target.value };
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="w-full" onClick={() => handleLogin(input)}>
                Login
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <FaImage className="w-full h-screen" />
        </div>
      </div>
    </>
  );
}
