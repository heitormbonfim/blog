import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PageContainer } from "../../components/ui/page-container";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";
import { CreateBlogModalContent } from "../../components/profile/create-blog-modal-content";
import { useEffect } from "react";
import api from "../../api/calls";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/user-slice";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetBlogs(user._id);
  }, []);

  async function handleGetBlogs(ownerId: string) {
    const response = await api.getBlogs(ownerId);

    if (response.error) {
      return toast.error(response.message);
    }

    dispatch(setBlogs(response.data));
  }

  return (
    <PageContainer>
      <main>
        <h1>{user.name.first}</h1>

        <div>
          <Button
            onClick={() => {
              const modal = document.getElementById("create-blog-modal") as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            Create Blog
          </Button>

          <Modal id="create-blog-modal">
            <CreateBlogModalContent />
          </Modal>
        </div>

        <h2 className="text-xl text-center font-bold">Blogs</h2>

        <div>
          {user.blogs?.length ? (
            user.blogs.map((blog, idx) => {
              return (
                <div key={blog.nameId + idx}>
                  <span>{blog.name}</span>
                </div>
              );
            })
          ) : (
            <h3 className="text-center font-bold my-10 underline">No Blog Was Created</h3>
          )}
        </div>
      </main>
    </PageContainer>
  );
}
