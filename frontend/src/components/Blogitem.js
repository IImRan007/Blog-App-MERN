import { useEffect } from "react";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, reset } from "../features/blogs/blogSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Blogitem = () => {
  const { blogs, isLoading, isSuccess } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

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
      <div className="mt-8 p-4 flex flex-wrap gap-x-8 gap-y-8 justify-around">
        {blogs &&
          blogs.map((blog) => (
            <div className="card w-96 shadow-xl bg-black" key={blog._id}>
              <figure className=" h-[24vh]">
                <img
                  src={`data:${blog.imgFile.contentType};base64, ${Buffer.from(
                    blog.imgFile.data
                  ).toString("base64")}`}
                  alt="Shoes"
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
