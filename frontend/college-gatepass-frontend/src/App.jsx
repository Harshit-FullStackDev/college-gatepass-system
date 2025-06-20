import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔁 Redirect based on role if someone hits "/"
function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role === "STUDENT") return <Navigate to="/student" />;
  if (user.role === "WARDEN") return <Navigate to="/warden" />;
  return <Navigate to="/login" />;
}

// ✅ Hide Navbar on login/register pages
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<RoleRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/student"
              element={
                <ProtectedRoute roles={["STUDENT"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/warden"
              element={
                <ProtectedRoute roles={["WARDEN"]}>
                  <WardenDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
