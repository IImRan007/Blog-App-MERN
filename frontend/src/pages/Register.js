import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect after register
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, user, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center text-2xl">
          <FaSignOutAlt className="inline-block" />
          <span className="ml-2">Signup</span>
        </h1>
      </div>
      <div className="mt-12">
        <form onSubmit={handleSubmit} className=" flex flex-col items-center">
          <div>
            <input
              type="name"
              id="name"
              value={name}
              placeholder="Enter your name"
              className="w-80 h-10 bg-white text-black input input-bordered sm:w-[27rem]"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              className="w-80 h-10 bg-white text-black input input-bordered sm:w-[27rem]"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              className="w-80 h-10 bg-white text-black input input-bordered sm:w-[27rem]"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-6">
            <input
              type="password"
              id="password2"
              value={password2}
              placeholder="Confirm password"
              className="w-80 h-10 bg-white text-black input input-bordered sm:w-[27rem]"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-wide mt-8">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
