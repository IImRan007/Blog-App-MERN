const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    imgFile: {
      data: Buffer,
      contentType: String,
    },
    tags: ["Programming", "Science", "Technology", "History"],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
