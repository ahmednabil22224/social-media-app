import reducerTypes from "./reducerTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case reducerTypes.LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export const loginSuccess = (payload) => ({
  type: reducerTypes.LOGIN_SUCCESS,
  payload,
});
export const logout = () => ({ type: reducerTypes.LOGOUT });
