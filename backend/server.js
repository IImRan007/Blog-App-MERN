const path = require("path");
const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

// Connect to databse
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to Blog API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
