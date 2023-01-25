import Blogitem from "../components/Blogitem";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex justify-center gap-x-4">
        <Link to="/">
          <button className="text-[20px] text-center mt-8 btn btn-ghost">
            All Blogs
          </button>
        </Link>
        <Link to="/my-blogs">
          <button className="text-[20px] text-center mt-8 btn btn-ghost">
            Your Blogs
          </button>
        </Link>
      </div>
      <Blogitem />
    </>
  );
};
export default Home;
