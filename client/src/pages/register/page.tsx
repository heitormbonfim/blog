import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/requests";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
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
                <Label htmlFor="last-name">Last name</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
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
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleRegister(input)}
            >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
