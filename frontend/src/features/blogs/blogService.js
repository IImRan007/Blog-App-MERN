import axios from "axios";

const API_URL = "/api/blogs/";

const createBlog = async (blogData, token) => {
  console.log(blogData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, blogData, config);

  return response.data;
};

const getBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const blogService = { createBlog, getBlogs };

export default blogService;
