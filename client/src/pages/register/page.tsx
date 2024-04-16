import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/calls";

interface InputData {
  first: string;
  last: string;
  email: string;
  password: string;
}

export default function Register() {
  const [input, setInput] = useState<InputData>({} as InputData);
  const redirect = useNavigate();

  async function handleRegister({ first, last, email, password }: InputData) {
    if (!first || !last || !email || !password) return;
    const response = await api.register({ first, last, email, password });

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    redirect("/login");
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="mx-auto max-w-sm">
        <div>
          <div className="text-xl">Sign Up</div>
          <div>Enter your information to create an account</div>
        </div>
        <div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="first-name">First name</label>
                <input
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
                <input
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
              <input
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
              <input
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
            <button type="submit" className="w-full" onClick={() => handleRegister(input)}>
              Create an account
            </button>
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
  );
}
