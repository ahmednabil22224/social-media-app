import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { register, loading } = useAuth();
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useFormValidation();
  // --------------------------------------------------------------------------
  async function registerUser() {
    let formData = new FormData();
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("name", values.firstname + " " + values.lastname);
    if (values.image) formData.append("image", values.image);

    try {
      await register(formData);
    } catch (err) {
      setErrors([err.message]);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="w-full max-w-md xs:max-w-xl px-5 py-7 text-center bg-white shadow-xl
           xxs:rounded-xl border-0
        ">
        <h1 className="mb-4 text-3xl font-bold">Create a new account</h1>
        <p className="text-xl text-slate-500">It's quick and easy.</p>
        <hr
          style={{ width: "108%", right: "4%" }}
          className="relative my-4 border"
        />
        <form className="register-form" action="">
          <div className="flex flex-col xs:flex-row gap-3 mb-4">
            <div className="firstname w-full">
              <input
                className="p-3 rounded-lg w-full border-2 text-sm"
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Firstname"
                onChange={handleChange}
              />
            </div>
            <div className="lastname w-full">
              <input
                className="p-3 rounded-lg w-full border-2 text-sm"
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Lastname"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <input
              className="p-3 rounded-lg w-full border-2 text-sm"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="mt-3 p-3 rounded-lg w-full border-2 text-sm"
              name="username"
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="mt-3 p-3 rounded-lg w-full border-2 text-sm"
              name="password"
              type="password"
              placeholder="Password  EX:Aa1!22222"
              autoComplete="new-password"
              title="Password must be at least 8 letters contain small, capital letter, digits and one of [!@#$&]"
              onChange={handleChange}
            />
          </div>
          <input
            className="mt-3 p-3 rounded-lg w-full border-2 text-sm"
            type="file"
            name="image"
            onChange={handleChange}
          />
          {errors.length ? <p className="text-red-500">{errors[0]}</p> : null}
          <button
            className="my-3 px-7 py-2 text-xl font-bold rounded-lg bg-green-800 text-white"
            type="submit"
            onClick={handleSubmit(registerUser)}>
            Sign Up
          </button>
        </form>
        <Link className="text-blue-700" to={"/login"}>
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Register;
