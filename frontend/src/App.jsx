import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./route/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(isLoggedIn);
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} /> */}

        {/* Admin Protected Route */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Employee Protected Route */}
        <Route element={<ProtectedRoute allowedRole="employee" />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
        </Route>





        {/* Default Route Redirect Based on Role */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path="/" element={<RoleBasedRedirect />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
