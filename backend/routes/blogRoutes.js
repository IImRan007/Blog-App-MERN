const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} = require("../controllers/blogController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/")
  .get(protect, getBlogs)
  .post(protect, upload.single("imgFile"), createBlog);

router.route("/all").get(getAllBlogs);

router
  .route("/:id")
  .get(protect, getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
