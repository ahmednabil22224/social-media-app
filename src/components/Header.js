import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultIcon from "../images/default-logo.webp";
import logo from "../images/logo.png";
import { FiPower, FiPlusSquare, FiHome } from "react-icons/fi";
import useFormValidation from "../hooks/useFormValidation";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  let user = JSON.parse(localStorage.getItem("user"));
  const isToken = useSelector((state) => state.auth.token);
  const { login, loading, logout } = useAuth();
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useFormValidation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  async function loginUser() {
    let body = {
      username: values.username,
      password: values.password,
    };

    try {
      await login(body);
    } catch (err) {
      setErrors([err.message]);
    }
  }

  return (
    <div className="header sticky top-0 z-10  m-auto shadow-md bg-white max-w-screen-sm border-b-2 border-slate-300">
      <div className={`links flex justify-between items-center p-2 rounded-sm`}>
        {isToken ? (
          <>
            <div className="flex items-center gap-3">
              <div>
                <img
                  className="w-8"
                  src={
                    typeof user.profile_image === "string"
                      ? user.profile_image
                      : defaultIcon
                  }
                  alt="profile"
                />
              </div>

              <div className="text-xl">
                <Link to={`/${user.username}`}>{user.name.slice(0, 15)}</Link>
              </div>
            </div>
            <ul className="flex items-center text-xl">
              <li className="">
                <Link to="/" className="block py-1.5 px-2" aria-label="Home">
                  {width > 448 ? "Home" : <FiHome className="text-2xl" />}
                </Link>
              </li>
              <li className="">
                <Link
                  to="/post"
                  className="block py-1.5 px-2"
                  aria-label="Add Post">
                  {width > 448 ? "Post" : <FiPlusSquare className="text-2xl" />}
                </Link>
              </li>

              <li className="">
                <button
                  className="py-1.5 px-2 text-red-700 hover:text-white hover:bg-red-500 rounded-lg transition duration-500"
                  aria-label="Logout Button"
                  onClick={logout}>
                  {width > 448 ? "Logout" : <FiPower className="text-2xl" />}
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="xxs:static xxs:ml-5 absolute left-1/2 -translate-x-1/2 top-14">
              <img
                className="w-16 xxs:w-8 rounded-full"
                src={logo}
                alt="logo"
              />
            </div>

            <form
              className="login-form w-full xxs:w-fit flex"
              onSubmit={handleSubmit(loginUser)}>
              <input
                className="p-1.5 rounded-lg border-2 text-sm flex-1"
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Username"
                onChange={handleChange}
              />
              <input
                className="p-1.5 rounded-lg border-2 text-sm ml-2 w-full flex-1"
                type="password"
                placeholder="Password EX:Aa1!22222"
                name="password"
                autoComplete="new-password"
                title="Password must be at least 8 letters contain small, capital letter, digits and one of [!@#$&]"
                onChange={handleChange}
              />
              <button type="submit"></button>
            </form>
          </>
        )}
      </div>
      {errors && <p className="text-red-500 text-right pr-10">{errors[0]}</p>}
    </div>
  );
};
