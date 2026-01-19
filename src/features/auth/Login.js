import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../hooks/useAuth";

const Login = ({ onClose, showModal }) => {
  const { login } = useAuth();

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    handleDemoUser,
  } = useFormValidation();

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
    <div className="h-screen flex justify-center items-center">
      <div className="login relative max-w-md px-5 py-7 text-center bg-white shadow-xl xxs:rounded-xl border-0">
        {showModal && (
          <button
            onClick={onClose}
            className="absolute rounded-full w-8 h-8 top-1 right-1 bg-red-500 text-white font-bold ">
            ✕
          </button>
        )}
        <h1 className="mb-6 text-3xl font-bold">Log in to App</h1>
        <form className="login-form" onSubmit={handleSubmit(loginUser)}>
          <input
            className="p-3 rounded-lg w-full border-2 text-sm"
            type="text"
            name="username"
            autoComplete="off"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            className="my-5 p-3 rounded-lg w-full border-2 text-sm"
            type="password"
            placeholder="Password EX:Aa1!22222"
            name="password"
            autoComplete="new-password"
            title="Password must be at least 8 letters contain small, capital letter, digits and one of [!@#$&]"
            onChange={handleChange}
          />
          {errors && <p className="text-red-500">{errors[0]}</p>}
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white text-xl font-bold py-2 rounded-lg flex-1"
              type="submit"
              aria-label="Submit Login"
              tabIndex="0">
              Log in
            </button>
            <button
              className="bg-violet-500 text-white text-xl font-bold py-2 px-2 rounded-lg"
              aria-label="Submit Login As Demo"
              tabIndex="0"
              onClick={handleDemoUser}>
              Demo
            </button>
          </div>
        </form>
        <p className="my-4 text-xl">
          {/* <a className="text-blue-700" href="#">
            Forgotten account?
          </a> */}
        </p>
        <div
          className="relative my-4 text-lg text-slate-500 before:absolute before:w-1/2 before:h-px before:bg-slate-400 before:top-1/2 before:-right-3
       after:absolute after:w-1/2 after:h-px after:bg-slate-400 after:top-1/2 after:-left-3">
          or
        </div>
        <button className="px-7 py-2 text-xl font-bold rounded-lg bg-green-800">
          <Link className=" text-white" to={"/register"}>
            Create new account
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
