import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog } from "../features/blogs/blogSlice";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { blog, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blogs
  );

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

  if (isLoading) {
    return <Spinner />;
  }

  return <div>Blog: {blog.title}</div>;
};
export default Blog;
