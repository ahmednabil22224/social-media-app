import { useState } from "react";

const useFormValidation = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    image: null,
  });
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const { name, type, files, value } = e.target;
    setValues({
      ...values,
      [name]: type === "file" ? files[0] : value,
    });
  }

  function handleDemoUser() {
    setValues({ ...values, username: "demo00", password: "11111!aA" });
  }

  const validate = () => {
    const errors = [];
    if (values?.username?.length < 6)
      errors.push("Username must be at least 6 characters");
    if (!/[a-z]/.test(values?.password))
      errors.push("Password must contain a small letter");
    if (!/[A-Z]/.test(values?.password))
      errors.push("Password must contain a capital letter");
    if (!/[0-9]/.test(values?.password))
      errors.push("Password must contain a digit");
    if (!/[!@#$&]/.test(values?.password))
      errors.push("Password must contain a special char (!@#$&)");
    if (values?.password?.length < 8)
      errors.push("Password must be at least 8 characters");
    return errors;
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      callback();
    }
  };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    handleDemoUser,
  };
};

export default useFormValidation;
