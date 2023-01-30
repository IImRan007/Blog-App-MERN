const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// @desc Create a new blog
// @route POST /api/blogs
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, imgFile, tags } = req.body;

  if (!title || !description || !tags) {
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

  res.status(200).json(blogs);
});

// @desc Get user single blog
// @route POST /api/blogs/:id
// @access Private
const getBlog = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(blog);
});

// @desc Update blog
// @route PUT /api/blogs/:id
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});

// @desc Delete blog
// @route DELETE /api/blogs/:id
// @access Private
const deleteBlog = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await blog.remove();

  res.status(200).json({ success: true });
});

module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
