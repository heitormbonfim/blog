import Login from "../pages/login/page";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = true;

  if (!user) {
    return <Login />;
  }

  return children;
}
