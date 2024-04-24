import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function EditBlogModal() {
  const currentBlogToEdit = useSelector((state: RootState) => state.blog);

  return <div>{currentBlogToEdit.name}</div>;
}
