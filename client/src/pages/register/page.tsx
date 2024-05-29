import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/requests";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Helmet } from "react-helmet";

interface InputData {
  first: string;
  last: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [input, setInput] = useState<InputData>({} as InputData);
  const redirect = useNavigate();

  async function handleRegister({ first, last, email, password }: InputData) {
    if (!first || !last || !email || !password) return;
    const response = await api.register({ first, last, email, password });

    if (response.error) {
      return toast.error(response.message, { position: "bottom-right" });
    }

    toast.success(response.message, { position: "bottom-right" });
    redirect("/login");
  }

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Login page to sign in to profile" />
      </Helmet>

      <main className="w-full min-h-screen flex justify-center items-center">
        <div className="mx-auto w-full max-w-[450px] border p-5">
          <div className="mb-4">
            <div className="text-xl font-bold">Sign Up</div>
            <div>Enter your information to create an account</div>
          </div>
          <div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="first-name">First name</label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    value={input.first || ""}
                    onChange={(event) =>
                      setInput((prev) => {
                        return {
                          ...prev,
                          first: event.target.value,
                        };
                      })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="last-name">Last name</label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    value={input.last || ""}
                    onChange={(event) =>
                      setInput((prev) => {
                        return {
                          ...prev,
                          last: event.target.value,
                        };
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={input.email || ""}
                  onChange={(event) =>
                    setInput((prev) => {
                      return {
                        ...prev,
                        email: event.target.value,
                      };
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={input.password || ""}
                  onChange={(event) =>
                    setInput((prev) => {
                      return {
                        ...prev,
                        password: event.target.value,
                      };
                    })
                  }
                />
              </div>
              <Button type="submit" className="my-5" onClick={() => handleRegister(input)}>
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
