import { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const NewBlog = () => {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleOnchange = (val) => {
    setDropdownValue(val.split(","));
  };

  const options = [
    { label: "Science", value: "science", style: { color: "black" } },
    { label: "Technology", value: "technology", style: { color: "black" } },
    { label: "Programming", value: "programming", style: { color: "black" } },
    { label: "History", value: "history", style: { color: "black" } },
  ];

  return (
    <div className="p-4">
      <div>
        <h1 className="text-[24px] text-center">Create New Blog</h1>
      </div>
      <form>
        <div className="flex flex-col mt-4 gap-y-2">
          <label className="text-[24px]">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="h-9 bg-white text-black input input-bordered"
            placeholder="Enter blog title"
          />
        </div>
        <div className="flex flex-col mt-4 gap-y-2">
          <label className="text-[24px]">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            className="h-[8.5rem] bg-white text-black input input-bordered"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4 gap-y-2">
          <label className="text-[24px]">Image</label>
          <input type="file" accept="image/*" name="file" />
        </div>
        <div className="flex flex-col mt-4 gap-y-2">
          <label className="text-[24px]">Tags</label>
          <MultiSelect
            onChange={handleOnchange}
            options={options}
            className="text-black"
          />
        </div>
        <button type="submit" className="btn mt-8">
          Create Blog
        </button>
      </form>
    </div>
  );
};
export default NewBlog;
