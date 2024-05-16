import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { PageContainer } from "../../components/ui/page-container";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import api from "../../api/requests";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Textarea } from "../../components/ui/text-area";

export default function PostCreation() {
  const currentblog = useSelector((state: RootState) => state.blog.data);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rawContent, setRawContent] = useState<EditorState>(() => EditorState.createEmpty());
  const [content, setContent] = useState<string>("");
  const [blogId, setBlogId] = useState<string>("");
  // const [file, setFile] = useState<File | null>(null!);
  // const [status, setStatus] = useState<"initial" | "uploading" | "success" | "fail">("initial");
  const redirect = useNavigate();

  useEffect(() => {
    if (!currentblog._id) {
      redirect("/profile");
    } else {
      setBlogId(currentblog._id);
    }
  }, []);

  useEffect(() => {
    const convertedContent = draftToHtml(convertToRaw(rawContent.getCurrentContent()));
    setContent(convertedContent);
  }, [rawContent]);

  async function handleCreateNewPost() {
    const response = await api.createNewPost({ author, blogId, content, summary, title });
    if (response.error) {
      return toast.error(response.message);
    }
    toast.success(response.message);
  }

  // async function handleUploadFile() {
  //   if (!file) return;

  //   setStatus("uploading");

  //   const formData = new FormData();

  //   formData.append("file", file);

  //   const response = await api.uploadFile(formData);

  //   if (response.error) {
  //     setStatus("fail");
  //     return toast.error(response.message);
  //   }

  //   setStatus("success");
  //   toast.success(response.message);
  // }

  if (!currentblog._id) {
    return (
      <PageContainer>
        <h2 className="text-3xl text-center font-bold my-10">Oops! you must select one blog</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Blog | Post Creation</title>
        <meta name="description" content="page dedicated to posts creation" />
      </Helmet>

      <h2 className="text-3xl text-center font-bold my-10">New Post</h2>
      <form onSubmit={handleCreateNewPost} className="pb-10">
        <div className="border-2 border-black mb-5 w-full min-h-screen">
          <Editor
            editorState={rawContent}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName h-full"
            onEditorStateChange={setRawContent}
          />
        </div>

        <div className="grid gap-3">
          <div className="lg:flex gap-3">
            <div className="grid w-full">
              <label htmlFor="title" className="font-bold">
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={title || ""}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="grid w-full">
              <label htmlFor="author" className="font-bold">
                Author
              </label>
              <Input
                id="author"
                type="text"
                value={author || ""}
                onChange={(event) => setAuthor(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid">
            <label htmlFor="summary" className="font-bold">
              Summary
            </label>
            <Textarea
              id="summary"
              value={summary || ""}
              onChange={(event) => setSummary(event.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit">Create Post</Button>
          </div>
        </div>
      </form>

      {/* <form onSubmit={handleUploadFile}>
        <div className="grid">
          <label htmlFor="image" className="font-bold">
            Choose a file
          </label>
          <Input
            id="image"
            type="file"
            onChange={(event) => {
              if (event.target.files) {
                setStatus("initial");

                setFile(event.target.files[0]);
              }
            }}
          />

          {file && (
            <section>
              File details:
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            </section>
          )}

          {file && <Button onClick={handleUploadFile}>Upload a file</Button>}

          <Result status={status} />
        </div>
      </form> */}
    </PageContainer>
  );
}

// const Result = ({ status }: { status: string }) => {
//   if (status === "success") {
//     return <p>✅ File uploaded successfully!</p>;
//   } else if (status === "fail") {
//     return <p>❌ File upload failed!</p>;
//   } else if (status === "uploading") {
//     return <p>⏳ Uploading selected file...</p>;
//   } else {
//     return null;
//   }
// };
