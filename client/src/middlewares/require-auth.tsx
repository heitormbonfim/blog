import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Login from "../pages/login/page";

export function RequireAuth({ children }: { children?: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user.data);

  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
}
