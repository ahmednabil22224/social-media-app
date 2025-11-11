import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout as logoutAction } from "../redux/authReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      dispatch(
        loginSuccess({ user: JSON.parse(storedUser), token: storedToken })
      );
    }
  }, [dispatch]);

  // Register
  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await api.post("/register", userData);
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (userData) => {
    try {
      setLoading(true);

      const response = await api.post("/login", userData);
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      dispatch(loginSuccess({ user, token }));
      if (location.pathname === "/login") navigate("/");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutAction());
    navigate("/login");
  };

  return {
    user,
    token,
    register,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
  };
};
