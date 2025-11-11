import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPost, editPost } from "../redux/reducerActions";
import { useDispatch, useSelector } from "react-redux";

export const AddEditForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts.selectedPost);
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    image: null,
  });

  useEffect(() => {
    if (!postId) {
      setPostData({ title: "", body: "", image: null });
    } else {
      setPostData({
        title: post.title || "",
        body: post.body || "",
        image: null,
      });
    }
  }, [postId]);

  const navigate = useNavigate();

  function getPostData(e) {
    setPostData({
      ...postData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  }

  function handleCreatePost(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", postData.title);
    formData.append("body", postData.body);
    if (postData.image && postData.image instanceof File)
      formData.append("image", postData.image);

    if (!postData.title || !postData.body) return;
    if (!postId) {
      dispatch(addPost(formData));
      navigate("/");
    } else {
      dispatch(editPost(postId, formData)).then(() => {
        navigate(-1);
      });
    }
  }

  return (
    <div className="bg-white max-w-screen-sm m-auto border-2 rounded-none xxs:rounded-lg border-slate-500 overflow-hidden p-3 mt-3">
      <h2 className="text-2xl font-bold mb-3">
        {postId ? "Edit Post" : "Add Post"}
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleCreatePost(e)}>
        <input
          className="border-2 rounded-lg p-2"
          type="text"
          name="title"
          value={postData.title}
          onChange={getPostData ?? ""}
        />
        <textarea
          className="border-2 rounded-lg h-20"
          name="body"
          value={postData.body}
          onChange={getPostData}></textarea>
        <input
          className="border-2 rounded-lg p-1.5"
          type="file"
          name="image"
          onChange={getPostData}
        />
        <div className="ml-auto">
          <button
            className="border-2 rounded-md px-4 py-1.5 mr-2"
            type="reset"
            onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="border-2 rounded-md px-4 py-1.5 bg-sky-500 text-white"
            type="submit">
            {postId ? "Edit Post" : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
