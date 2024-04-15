import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <main>
      <h1 className="py-5 w-full text-center text-2xl font-semibold border-b-2 border-zinc-500">
        Profile
      </h1>

      <div>{/* <h2>User: {user.data.name.first}</h2> */}</div>
    </main>
  );
}
