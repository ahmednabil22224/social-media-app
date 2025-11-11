import { useDispatch } from "react-redux";
import { addComment } from "../redux/reducerActions";
import { useState } from "react";

const AddCommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  function handleAddComment() {
    const newComment = {
      body: comment,
    };
    dispatch(addComment(postId, newComment));
    setComment("");
  }

  return (
    <div className="sticky max-w-screen-sm m-auto flex bottom-0 left-0 right-0 bg-white p-4  border-2 xxs:rounded-lg rounded-none border-slate-300">
      <input
        className="w-full p-1 border-2 rounded-lg"
        type="text"
        placeholder="Add Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-2"
        onClick={handleAddComment}>
        Send
      </button>
    </div>
  );
};

export default AddCommentForm;
