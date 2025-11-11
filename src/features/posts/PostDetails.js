import { useEffect } from "react";
import { Post } from "./Post";
import { useParams } from "react-router-dom";
import { getSelectedPost } from "../../redux/reducerActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../../components/LoaderSpinner";

export const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const {
    selectedPost: post,
    isLoading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getSelectedPost(`/posts/${postId}`));
  }, [dispatch, postId]);

  return (
    <>
      {error && (
        <p className="text-red-500 max-w-screen-sm m-auto">
          {error.message || error}
        </p>
      )}
      {isLoading ? <LoaderSpinner /> : null}
      {Object.values(post).length > 0 ? (
        <Post
          key={post.id}
          id={post.id}
          userId={post.author.id}
          profileImg={post.author.profile_image}
          userName={post.author.username}
          name={post.author?.name}
          bodyImg={post.image}
          createdAt={post.created_at}
          title={post.title}
          body={post.body}
          commentsCount={post.comments_count}
          comments={post.comments}
          tags={post.tags}
        />
      ) : (
        ""
      )}
    </>
  );
};
