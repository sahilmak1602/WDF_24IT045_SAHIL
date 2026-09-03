import { Link, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginPage from "./pages/LoginPage";
import ClassesPage from "./pages/ClassesPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProtectedRoute from "./ProtectedRoute";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Login</Link>{" | "}
        <Link to="/classes">Classes</Link>{" | "}
        <Link to="/my-bookings">My Bookings</Link>{" | "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/classes" element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<Suspense fallback={<p>Loading admin...</p>}><AdminPanel /></Suspense>} />
      </Routes>
    </>
  );
}
