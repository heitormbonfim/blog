import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-center text-4xl font-semibold">404 Page Not Found</h1>
      <Button variant="secondary" asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </main>
  );
}
