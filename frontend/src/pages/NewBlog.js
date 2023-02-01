import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, createBlog } from "../features/blogs/blogSlice";
import Spinner from "../components/Spinner";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const NewBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [tags, setTags] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const { title, description } = formData;

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blogs
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dropdown change
  const handleOnchange = (val) => {
    setTags(val);
  };

  const options = [
    { label: "Science", value: "Science", style: { color: "black" } },
    { label: "Technology", value: "Technology", style: { color: "black" } },
    { label: "Programming", value: "Programming", style: { color: "black" } },
    { label: "History", value: "History", style: { color: "black" } },
  ];

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imgFile", imgFile);
    formData.append("tags", tags);

    dispatch(createBlog(formData)).then(() => {
      console.log("navigate");
      navigate("/");
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="text-[24px] text-center">Create New Blog</h1>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col mt-4 gap-y-2">
            <label className="text-[24px]">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              className="h-9 bg-white text-black input input-bordered w-[22rem] sm:w-[27rem] md:w-[32rem] lg:w-[34rem]"
              placeholder="Enter blog title"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mt-4 gap-y-2">
            <label className="text-[24px]">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              placeholder="Enter description"
              className="h-[14rem] bg-white text-black input input-bordered w-[22rem] sm:w-[27rem] md:w-[32rem] lg:w-[34rem]"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex flex-col mt-4 gap-y-2">
            <label className="text-[24px]">Image</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="imgFile"
              id="imgFile"
              required
              onChange={onImageChange}
            />
          </div>
          <div className="flex flex-col mt-4 gap-y-2">
            <label className="text-[24px]">Tags</label>
            <MultiSelect
              onChange={handleOnchange}
              options={options}
              className="text-black"
            />
          </div>
          <button className="btn mt-8">Create Blog</button>
        </form>
      </div>
    </div>
  );
};
export default NewBlog;
