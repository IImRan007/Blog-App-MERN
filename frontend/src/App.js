import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBlog from "./pages/NewBlog";
import Blog from "./pages/Blog";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/new-blog"
            element={
              <PrivateRoute>
                <NewBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:blogId"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};
export default App;
