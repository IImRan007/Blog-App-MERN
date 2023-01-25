const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createBlog, getBlogs } = require("../controllers/blogController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(protect, getBlogs)
  .post(protect, upload.single("imgFile"), createBlog);

module.exports = router;
