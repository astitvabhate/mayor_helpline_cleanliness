import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminLogin from "./pages/admin/admin-login";
import PrivateRoute from "./components/PrivateRoute";
import ReportForm from "./pages/client/report-form";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client/report" element={<ReportForm />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
