import reducerTypes from "./reducerTypes";

const initialValue = {
  posts: [],
  userPosts: [],
  selectedPost: {},
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
}; 

export const postsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case reducerTypes.POSTS_PENDING:
      return { ...state, isLoading: true, error: null };
    case reducerTypes.POSTS_SUCCESS:
      const newPosts = state.posts
        ? state.posts.concat(action.payload.data)
        : action.payload.data;

      return {
        ...state,
        posts: newPosts,
        isLoading: false,
        totalPages: action.payload?.meta?.last_page || 1,
      };
    case reducerTypes.POSTS_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case reducerTypes.USER_POSTS_SUCCESS:
      return { ...state, isLoading: false, userPosts: action.payload };
    case reducerTypes.SELECTED_POST_SUCCESS:
      return { ...state, isLoading: false, selectedPost: action.payload };
    case reducerTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case reducerTypes.ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case reducerTypes.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload)],
        userPosts: [
          ...state.userPosts.filter((post) => post.id !== action.payload),
        ],
      };
    case reducerTypes.EDIT_POST:
      return {
        ...state,
        choosedPost: action.payload,
        userPosts: [
          ...state.userPosts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        ],
        posts: [
          ...state.posts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        ],
      };
    case reducerTypes.ADD_COMMENT:
      return {
        ...state,
        selectedPost: state.selectedPost
          ? {
              ...state.selectedPost,
              comments: [
                ...(state.selectedPost.comments || []),
                action.payload,
              ],
            }
          : state.selectedPost,
      };
    default:
      return state;
  } 
};

