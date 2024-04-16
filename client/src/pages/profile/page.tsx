import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <main>
      <h1>{user.name.first}</h1>
    </main>
  );
}
