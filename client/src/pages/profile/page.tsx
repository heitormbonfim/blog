import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PageContainer } from "../../components/ui/page-container";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";
import { CreateNewBlogModal } from "../../components/profile/create-new-blog-modal";
import { useEffect } from "react";
import api from "../../api/calls";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/user-slice";
import { BlogCard } from "../../components/profile/blog-card";
import { CircleButton } from "../../components/ui/mobile-button";
import { FaPlus } from "react-icons/fa6";
import EditBlogModal from "../../components/profile/edit-blog-modal";

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
        <h2 className="text-3xl text-center font-bold my-10">Blogs</h2>

        <div className="pb-5 flex justify-end">
          <Button
            onClick={() => {
              const modal = document.getElementById("create-blog-modal") as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}
            className="hidden lg:inline-block"
          >
            Create Blog
          </Button>

          <CircleButton
            className="lg:hidden fixed bottom-5 right-5"
            onClick={() => {
              const modal = document.getElementById("create-blog-modal") as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            <FaPlus size={30} />
          </CircleButton>

          <Modal id="create-blog-modal">
            <CreateNewBlogModal />
          </Modal>

          <Modal id="edit-blog">
            <EditBlogModal />
          </Modal>
        </div>

        {user.blogs?.length ? (
          <div className="flex flex-wrap justify-center item-center lg:justify-start gap-3">
            {user.blogs.map((blog, idx) => {
              return <BlogCard key={blog.nameId + idx} blog={blog} />;
            })}
          </div>
        ) : (
          <h3 className="text-center font-bold my-10 underline">No Blog Was Created</h3>
        )}
      </main>
    </PageContainer>
  );
}
