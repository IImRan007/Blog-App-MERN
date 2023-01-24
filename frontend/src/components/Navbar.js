import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logoutUser } from "../features/auth/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());

    navigate("/");
  };

  return (
    <div className="navbar bg-[#1212128f] ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Blog
        </Link>
      </div>
      {user ? (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2" onClick={handleLogout}>
              <Link to="/logout">
                <FaSignOutAlt /> Logout
              </Link>
            </li>
            <li className="mr-2">
              <Link to="/new-blog">Create Blog</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Navbar;
