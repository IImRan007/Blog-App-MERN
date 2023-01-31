import axios from "axios";

const API_URL = "/api/blogs/";

// Create blog
const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, blogData, config);

  return response.data;
};

// Get blogs
const getBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user blog
const getBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + blogId, config);

  return response.data;
};

// Update blog
const updateBlog = async (blogId, blogData, token) => {
  console.log(blogData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + blogId, blogData, config);

  return response.data;
};

// Delete user blog
const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + blogId, config);

  return response.data;
};

const blogService = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };

export default blogService;
