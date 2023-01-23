import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, loginUser } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect after login
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, message, user, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center text-2xl">
          <FaSignInAlt className="inline-block" />
          <span className="ml-2">Login into your account</span>
        </h1>
      </div>
      <div className="mt-12">
        <form onSubmit={handleSubmit} className=" flex flex-col items-center">
          <div>
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
          <button type="submit" className="btn btn-wide mt-8">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
