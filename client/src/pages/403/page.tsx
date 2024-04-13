import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Page403() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-center text-4xl font-semibold">403 Access Denied</h1>
      <Button variant="secondary" asChild>
        <Link to="/login">Sign In</Link>
      </Button>
    </main>
  );
}
