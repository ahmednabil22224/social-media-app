import { useEffect } from "react";
import { Post } from "./Post";
import { getUserPosts } from "../../redux/reducerActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../../components/LoaderSpinner";
import { NotFound } from "../../components/NotFound";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const { userPosts, isLoading, error } = useSelector((state) => state.posts);

  const user = JSON.parse(localStorage.getItem("user") || null);

  useEffect(() => {
    if (username === "login" || username === "register") {
      navigate("/");
      return;
    }
    dispatch(getUserPosts(user.id));
  }, [dispatch]);

  if (!user || user.username !== username) {
    return <NotFound />;
  }

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
        .map((ele) => (
          <Post
            key={ele.id}
            id={ele.id}
            userId={ele.author.id}
            profileImg={ele.author.profile_image}
            userName={ele.author.username}
            name={ele.author?.name}
            bodyImg={ele.image}
            createdAt={ele.created_at}
            title={ele.title}
            body={ele.body}
            commentsCount={ele.comments_count}
            tags={ele.tags}
          />
        ))}
    </>
  );
};
