import api from "@/services/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess, setLoading } from "@/redux/slices/user-slice";
import { useState } from "react";
import { toast } from "react-toastify";
import { setAuthToken } from "@/redux/slices/tokens-slice";

interface InputData {
  email: string;
  password: string;
}

export default function Login() {
  const [input, setInput] = useState<InputData>({} as InputData);
  const dispatch = useDispatch();

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (!email || !password) return;

    dispatch(setLoading());

    const response = await api.login({ email, password });

    if (response.error) {
      return toast.error(response.message);
    }

    dispatch(loginSuccess(response.data));

    dispatch(setAuthToken(response.data.token));

    localStorage.setItem("auth", response.data.token);

    toast.success("Logged In");
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
                <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
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
              <Button
                type="submit"
                className="w-full"
                onClick={() =>
                  handleLogin({ email: input.email, password: input.password })
                }
              >
                Login
              </Button>
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
          <Image className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
        </div>
      </div>
    </>
  );
}
