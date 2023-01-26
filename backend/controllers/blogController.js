const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// @desc Create a new blog
// @route POST /api/blogs
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, imgFile, tags } = req.body;

  if (!title || !description || imgFile || !tags) {
    res.status(400);
    throw new Error("Please include all the fields");
  }

  // Get user using the id and the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.create({
    title,
    description,
    imgFile: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    tags,
    user: req.user.id,
  });

  res.status(201).json(blog);
});

// @desc Get user blogs
// @route POST /api/blogs
// @access Private
const getBlogs = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blogs = await Blog.find({ user: req.user.id });
});

module.exports = { createBlog, getBlogs };
