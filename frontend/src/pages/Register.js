import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
  };

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
          <button type="submit" className="btn btn-wide mt-8">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
