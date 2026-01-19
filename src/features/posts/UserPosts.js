import { useEffect } from "react";
import { Post } from "./Post";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../redux/reducerActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../../components/LoaderSpinner";

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userPosts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getUserPosts(userId));
  }, [dispatch]);

  if ((!userPosts || userPosts.length === 0) && !isLoading)
    return <div className="text-center text-red-500 mt-5">No posts found</div>;

  return (
    <>
      {error && (
        <p className="text-red-500 max-w-screen-sm m-auto">
          {error.message || error}
        </p>
      )}
      {isLoading ? <LoaderSpinner /> : null}
      {userPosts
        .sort((a, b) => (a.id < b.id ? 1 : -1))
        .map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.author.id}
            profileImg={post.author.profile_image}
            userName={post?.author?.name}
            bodyImg={post.image}
            createdAt={post.created_at}
            title={
              post.title?.length > 50
                ? post.title.slice(0, 50) + "....."
                : post.title
            }
            body={
              post.body?.length > 80
                ? post.body.slice(0, 80) + "....."
                : post.body
            }
            commentsCount={post.comments_count}
            comments={post.comments}
            tags={post.tags}
          />
        ))}
    </>
  );
};
