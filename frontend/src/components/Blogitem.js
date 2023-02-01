import { useEffect } from "react";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, reset } from "../features/blogs/blogSlice";
import Spinner from "./Spinner";
import { Link, NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Blogitem = () => {
  const { blogs, isLoading, isError, message } = useSelector((state) => {
    console.log("state", state.blogs);
    return state.blogs;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getBlogs());
  }, [isError, message, dispatch]);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-center gap-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <button className="text-[20px] text-center mt-8 btn btn-ghost">
            All Blogs
          </button>
        </NavLink>
        <NavLink
          to="/my-blogs"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <button className="text-[20px] text-center mt-8 btn btn-ghost">
            Your Blogs
          </button>
        </NavLink>
      </div>
      <div className="mt-8 p-8 flex justify-around flex-wrap gap-x-16 gap-y-16">
        {blogs &&
          blogs.map((blog) => (
            <div className="card w-96 shadow-xl bg-black" key={blog._id}>
              <figure className=" h-[24vh]">
                <LazyLoadImage
                  src={`data:${blog.imgFile.contentType};base64, ${Buffer.from(
                    blog.imgFile.data
                  ).toString("base64")}`}
                  alt="poster"
                  effect="blur"
                />
              </figure>
              <div className="card-body h-[40vh]">
                <h2 className="card-title">
                  {blog.title}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{blog.description.slice(0, 200)}...</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">
                    {new Date(blog.createdAt).toLocaleDateString("en-US")}
                  </div>
                  {blog.tags.map((tag) => {
                    let result = tag.split(",");
                    return result.map((elem, i) => (
                      <div className="badge badge-outline" key={i}>
                        {[elem]}
                      </div>
                    ));
                  })}
                </div>
                <div className="flex justify-center">
                  <Link to={`/blog/${blog._id}`}>
                    <button className="btn btn-wide btn-primary mt-4">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Blogitem;
