import React, { useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import defaultIcon from "../../images/default-logo.webp";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/reducerActions";
import AddCommentForm from "../../components/AddCommentForm";

const Post = React.memo((props) => {
  const { postId, userId, username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function isMyUser() {
    if (JSON.parse(localStorage.getItem("user"))) {
      let user = JSON.parse(localStorage.getItem("user"));
      return Number(userId) === user.id ||
        user.username === username ||
        props.userId === user.id
        ? true
        : false;
    }
    return false;
  }

  function handleDeletePost(id) {
    dispatch(deletePost(id));
    if (postId) navigate("/");
  }

  return (
    <>
      <div className="max-w-screen-sm m-auto border-2 xxs:rounded-lg rounded-none border-slate-300 mt-3 overflow-hidden">
        <div className="header p-2 bg-white flex justify-between items-center border-b-2 border-b-slate-200">
          <div className="flex items-center">
            <img
              className="w-10 h-10 mr-3 border-4 rounded-full object-cover"
              src={
                typeof props.profileImg === "string"
                  ? props.profileImg
                  : defaultIcon
              }
              alt="ProfileImg"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultIcon;
              }}></img>
            <Link
              to={
                isMyUser()
                  ? `/${props.userName}`
                  : `/users/${props.userId}/posts`
              }>
              <p id="user-name" className="cursor-pointer">
                {props.userName}
              </p>
            </Link>
          </div>

          {isMyUser() && pathname !== "/" ? (
            <div>
              <button
                className="px-3 py-1 ml-2 rounded-lg bg-cyan-400 text-white"
                onClick={() => navigate(`/edit/${props.id}`)}>
                Edit
              </button>
              <button
                className="px-3 py-1 ml-2  rounded-lg bg-red-500 text-white"
                onClick={() => handleDeletePost(props.id)}>
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <Link to={`/post/${props.id}`}>
          <div className="card bg-white p-3">
            <div className="image mt-3 rounded-lg overflow-hidden">
              <img
                className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                src={props.bodyImg}
                alt={"Post Image"}
                loading="lazy"
                decoding="async"></img>
            </div>
            <p className="text-xs text-gray-500 pt-2" id="create-date">
              {props.createdAt}
            </p>
            <p className="my-1" id="title">
              {props.title}
            </p>
            <p id="body">{props.body}</p>
          </div>
        </Link>

        <div className="comments  bg-white p-2.5 border-t-2 border-t-slate-200">
          <div className="flex justify-between flex-wrap">
            <div className="flex items-center">
              <span className="inline-block">
                <FaPenAlt />
              </span>
              <span className="mx-1.5">({props.commentsCount})</span>
              <Link to={`/post/${props.id}`}>
                <span>Comments</span>
              </Link>
            </div>
            <div className="tags">
              {props.tags?.map((tag) => (
                <span className="bg-blue-500 text-white text-sm px-1.5 py-0.5 rounded-lg ml-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {postId && (
            <>
              {props.comments?.length ? (
                <fieldset className="border-2 rounded-lg p-1.5">
                  <legend className="px-2 text-lg font-medium">Comments</legend>

                  {props.comments?.map((comment) => (
                    <div key={comment.id} className="flex mb-3">
                      <img
                        className="w-10 h-10 mr-3 border-4 rounded-full"
                        src={
                          typeof comment.author.profile_image === "string"
                            ? comment.author.profile_image
                            : defaultIcon
                        }
                        alt="ProfileImg"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultIcon;
                        }}></img>
                      <Link to={`/users/${comment.author.id}/posts`}>
                        <div className="bg-slate-200 p-2 rounded-lg">
                          <span className="block font-bold">
                            {comment.author.username}
                          </span>
                          <span>{comment.body}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </fieldset>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
      {postId && <AddCommentForm postId={postId} />}
    </>
  );
});

export { Post };
