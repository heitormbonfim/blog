import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PageContainer } from "../../components/ui/page-container";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";
import { CreateBlogModal } from "../../components/profile/create-blog-modal";
import { useEffect } from "react";
import api from "../../api/requests";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/slices/user-slice";
import { BlogCard } from "../../components/profile/blog-card";
import { CircleButton } from "../../components/ui/mobile-button";
import { FaPlus } from "react-icons/fa6";
import EditBlogModal from "../../components/profile/edit-blog-modal";
import { setPostDataLoading } from "../../redux/slices/post-slice";
import { Helmet } from "react-helmet";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetBlogs();
  }, []);

  async function handleGetBlogs() {
    dispatch(setPostDataLoading(true));
    const response = await api.getBlogs();
    dispatch(setPostDataLoading(false));

    if (response.error) {
      return toast.error(response.message);
    }

    dispatch(setBlogs(response.data));
  }

  function handleOpenCreateBlogModal() {
    const modal = document.getElementById("create-blog-modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Profile</title>
        <meta name="description" content="Profile page containing user blogs" />
      </Helmet>

      <main>
        <h2 className="text-3xl text-center font-bold my-10">Blogs</h2>

        <div className="mb-5 flex justify-center">
          <Button onClick={handleOpenCreateBlogModal} className="hidden lg:inline-block">
            Create Blog
          </Button>

          <CircleButton
            className="lg:hidden fixed bottom-5 right-5"
            onClick={handleOpenCreateBlogModal}
          >
            <FaPlus size={30} />
          </CircleButton>

          <Modal id="create-blog-modal">
            <CreateBlogModal />
          </Modal>

          <Modal id="edit-blog-modal">
            <EditBlogModal />
          </Modal>
        </div>

        {user.blogs?.length ? (
          <div className="flex flex-wrap justify-center item-center gap-3">
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
