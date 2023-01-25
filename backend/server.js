const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

// Connect to databse
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Blog API" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
