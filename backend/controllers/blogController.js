const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// @desc Create a new blog
// @route POST /api/blogs
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, imgFile, tags } = req.body;
  console.log(req.body);

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

  const blog = {
    title,
    description,
    imgFile: {
      // data: req.file.buffer,
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    tags,
    user: req.user.id,
  };
  console.log(blog);

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