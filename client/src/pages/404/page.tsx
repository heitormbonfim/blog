import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function Page404() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-3">
      <h2 className="text-2xl font-bold">404 - Not found</h2>
      <Link to="/">
        <Button variant="link">Go back to home</Button>
      </Link>
    </div>
  );
}
