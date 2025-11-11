import { api } from "../api/api";
import reducerTypes from "./reducerTypes";

export function getPosts(pageIndex) {
  return async (dispatch) => {
    dispatch({ type: reducerTypes.POSTS_PENDING });
    try {
      const url = `/posts?limit=2&page=${pageIndex}`;
      const response = await api.get(url);
      dispatch({ type: reducerTypes.POSTS_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export const setCurrentPage = (page) => ({
  type: reducerTypes.SET_CURRENT_PAGE,
  payload: page,
});

export function getUserPosts(id) {
  return async (dispatch) => {
    dispatch({ type: reducerTypes.POSTS_PENDING });
    try {
      const url = `/users/${id}/posts`;
      const response = await api.get(url);
      dispatch({
        type: reducerTypes.USER_POSTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export function getSelectedPost(url) {
  return async (dispatch) => {
    dispatch({ type: reducerTypes.POSTS_PENDING });
    try {
      const response = await api.get(url);
      dispatch({
        type: reducerTypes.SELECTED_POST_SUCCESS,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export function addPost(newPost) {
  return async (dispatch) => {
    try {
      const response = await api.post("/posts", newPost);
      dispatch({ type: reducerTypes.ADD_POST, payload: response.data.data });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export function editPost(id, updatedPost) {
  return async (dispatch) => {
    try {
      updatedPost.append("_method", "PUT");
      const response = await api.post(`/posts/${id}`, updatedPost);
      dispatch({ type: reducerTypes.EDIT_POST, payload: response?.data?.data });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      const url = `/posts/${id}`;
      const response = await api.delete(url);
      dispatch({ type: reducerTypes.DELETE_POST, payload: id });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}

export function addComment(id, newComment) {
  if (!newComment.body.trim()) return;
  return async (dispatch) => {
    try {
      const url = `/posts/${id}/comments`;
      const response = await api.post(url, newComment);
      dispatch({
        type: reducerTypes.ADD_COMMENT,
        payload: response?.data?.data,
      });
    } catch (err) {
      dispatch({
        type: reducerTypes.POSTS_FAILED,
        payload: err.response?.data || err.message,
      });
    }
  };
}
