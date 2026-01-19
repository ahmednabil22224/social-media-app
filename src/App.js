import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { Posts } from "./features/posts/FullPosts";
import { UserPosts } from "./features/posts/UserPosts";
import { PostDetails } from "./features/posts/PostDetails";
import { Profile } from "./features/posts/Profile";
import { AddEditForm } from "./components/AddEditForm";
import { AuthModal } from "./components/AuthModal";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (
      !isToken &&
      location.pathname !== "/" &&
      location.pathname !== "/register" &&
      location.pathname !== "/login"
    )
      setShowModal(true);
    else setShowModal(false);

    const handleScroll = () => {
      const key = `scroll-${location.pathname}`;
      sessionStorage.setItem(key, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isToken]);

  useEffect(() => {
    const key = `scroll-${location.pathname}`;
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "auto";
        }, 500);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="App relative">
      <AuthModal isOpen={showModal} currentPath={location.pathname}>
        <Header />
        <Login onClose={handleCloseModal} showModal={showModal} />
      </AuthModal>

      <div
        className={`${
          showModal ? "filter blur-sm pointer-events-none" : ""
        } transition-all`}>
        {isToken && <Header />}
        <Routes>
          {!isToken && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {isToken && <Route path="/" element={<Posts />} />}
          <Route path="/post" element={<AddEditForm />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/edit/:postId" element={<AddEditForm />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
