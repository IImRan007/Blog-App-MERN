import { useEffect } from "react";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, reset } from "../features/blogs/blogSlice";
import Spinner from "./Spinner";

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
    <div className="mt-8 p-4 flex flex-wrap gap-x-8 gap-y-8 justify-around">
      {blogs.map((blog) => (
        <div className="card w-96 shadow-xl bg-black" key={blog._id}>
          <figure>
            <img
              src={`data:${blog.imgFile.contentType};base64, ${Buffer.from(
                blog.imgFile.data
              ).toString("base64")}`}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {blog.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{blog.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{blog.tags}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Blogitem;
