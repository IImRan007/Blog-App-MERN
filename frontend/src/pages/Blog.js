import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlog, updateBlog } from "../features/blogs/blogSlice";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { blog, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blogs
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBlog(blogId));
    // eslint-disable-next-line
  }, [isError, message, blogId]);

  useEffect(() => {
    if (blog.title) {
      setTitle(blog.title);
      setDescription(blog.description);
    }
  }, [blog.title, blog.description]);

  const handleUpdate = () => {
    console.log({ title, description, blogId });
    const blogData = { title, description, blogId };
    dispatch(updateBlog(blogData));
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blogId));
    if (isSuccess) {
      navigate("/");
    }
    toast.success(`Blog: ${blog.title} deleted successfully`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mt-8 flex justify-end">
        <p className="border-solid border-2 p-[4px] rounded-[6px] mr-[1.5rem]">
          Created At: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <h1 className="text-[20px] mt-8 ml-4">{blog.title}</h1>
      </div>
      <div className="p-4">
        <h1>Description:</h1>
        <p className="mt-4">{blog.description}</p>
      </div>
      <div className="flex gap-x-4 ml-4 mt-4">
        <label htmlFor="my-modal-1" className="btn btn-outline">
          Edit
        </label>
        <label htmlFor="my-modal" className="btn btn-outline btn-error">
          Delete
        </label>
      </div>

      {/* Edit Modal */}
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box h-[75vh]">
          <h3 className="font-bold text-lg">Edit Blog: {blog.title}</h3>
          <form>
            <div className="flex flex-col mt-4 gap-y-2">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                name="title"
                id="title"
                placeholder="Blog title"
                className="h-9 bg-white text-black input input-bordered"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4 gap-y-2">
              <label>Description:</label>
              <textarea
                name="description"
                id="description"
                value={description}
                placeholder="Blog description"
                className="h-[26rem] bg-white text-black input input-bordered"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </form>
          <div className="modal-action">
            <label
              htmlFor="my-modal-1"
              className="btn btn-error"
              onClick={handleUpdate}
            >
              Save
            </label>
            <label htmlFor="my-modal-1" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Blog: {blog.title}</h3>
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-error"
              onClick={handleDelete}
            >
              Yes
            </label>
            <label htmlFor="my-modal" className="btn">
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
