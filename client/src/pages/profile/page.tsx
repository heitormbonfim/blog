import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PageContainer } from "../../components/ui/page-container";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";
import { CreateBlogModalContent } from "../../components/profile/create-blog-modal-content";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.data);

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

        <div></div>
      </main>
    </PageContainer>
  );
}
