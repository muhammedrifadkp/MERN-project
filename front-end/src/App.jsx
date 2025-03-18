import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Cart from "./pages/Cart";
import AddCourse from "./pages/AddCourse";

function App() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes (Require Authentication) */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-course" element={<AddCourse />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
