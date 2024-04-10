import { createContext, useState } from "react";

interface StoreProps {
  children?: React.ReactNode;
}

export interface Store {
  user: User;
  setUser: (user: User) => void;
}

export interface User {
  name: {
    first: string;
    last: string;
  };
}

const storeContext = createContext<Store>(null!);

export function Store({ children }: StoreProps) {
  const [user, setUser] = useState<User>(null!);

  const values = {
    user,
    setUser,
  };

  return (
    <storeContext.Provider value={values}>{children}</storeContext.Provider>
  );
}
