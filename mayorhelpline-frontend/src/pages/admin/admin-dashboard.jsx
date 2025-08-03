import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import modijiImage from "../../assets/modi_boss.jpg";
import mohanjiImage from "../../assets/mohan_yadav.webp";
import mayorImage from "../../assets/images.jpeg";
import commissionerImage from "../../assets/priti_yadav.jpg";
import banner1 from "../../assets/banner/1.jpeg";
import banner2 from "../../assets/banner/2.jpeg";
import { Menu, X } from "lucide-react";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized access. Please log in.");
      navigate("/admin/login");
    }
  }, []);

  // 🔧 Fetch reports on component mount
useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axios.get("https://mayor-helpline-cleanliness.onrender.com/api/reports");
      setReports(response.data.reports);
    } catch (error) {
      console.error("❌ Error fetching reports:", error.message);
    }
  };

  fetchReports();
}, []);


  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this report?");
    if (!confirm) return;

    try {
      await axios.delete(`https://mayor-helpline-cleanliness.onrender.com/api/reports/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete report.");
    }
  };

  const totalReports = reports.length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;

const [currentBanner, setCurrentBanner] = useState(0);
const banners = [banner1, banner2]; // Add more if needed

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, 3000); // Every 3 seconds

  return () => clearInterval(interval); // cleanup
}, [banners.length]);




  return (
    <div className="relative min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-md transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex flex-col justify-between`}
      >
        <div>
          <div className="p-6 text-xl font-bold border-b flex justify-between items-center">
            Admin Panel
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2 text-gray-700">
            <a href="/admin/dashboard" className="block hover:text-blue-600">
              Dashboard
            </a>
            <a href="#" className="block hover:text-blue-600">
              Reports
            </a>
            <a href="#" className="block hover:text-blue-600">
              Users
            </a>
            <a href="#" className="block hover:text-blue-600">
              Settings
            </a>
          </nav>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-black rounded-full" />
            <div className="hover:text-blue-600 cursor-pointer">Hi, Admin</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Topbar */}
        <header className="bg-white shadow px-4 py-4 flex justify-between items-center md:px-6">
          <div className="flex items-center space-x-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 font-medium hover:underline cursor-pointer"
          >
            Logout
          </button>
        </header>

        {/* Banner */}
        <div className="relative z-10 bg-blue-100 text-white flex items-center justify-center overflow-hidden p-4 sm:h-56">
          <div className="w-full max-w-xl rounded-xl shadow-lg overflow-hidden h-40 sm:h-full">
            <img
              src={banners[currentBanner]}
              alt="Dashboard Banner"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="absolute right-4 top-4 sm:top-auto sm:bottom-4 flex items-center">
            <img
              src={modijiImage}
              alt="Modiji"
              className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-full shadow border-2 border-white mr-2"
            />
            <img
              src={mohanjiImage}
              alt="Mohanji"
              className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-full shadow border-2 border-white mr-2"
            />
            <img
              src={mayorImage}
              alt="Mayor"
              className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-full shadow border-2 border-white"
            />
            <img
              src={commissionerImage}
              alt="Commissioner"
              className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-full shadow border-2 border-white"
            />
          </div>
        </div>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
              <h2 className="text-base sm:text-lg font-semibold">Total Reports</h2>
              <p className="mt-1 text-xl sm:text-2xl font-bold text-blue-600">
                {loading ? "--" : totalReports}
              </p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
              <h2 className="text-base sm:text-lg font-semibold">Resolved Cases</h2>
              <p className="mt-1 text-xl sm:text-2xl font-bold text-green-600">
                {loading ? "--" : resolvedCount}
              </p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
              <h2 className="text-base sm:text-lg font-semibold">Pending Reviews</h2>
              <p className="mt-1 text-xl sm:text-2xl font-bold text-yellow-600">
                {loading ? "--" : pendingCount}
              </p>
            </div>
          </div>

          {/* Reports List */}
          <section>
            <h2 className="text-xl font-bold mb-4">📋 All Reports</h2>
            {loading ? (
              <p>Loading reports...</p>
            ) : reports.length === 0 ? (
              <p>No reports available.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-800">
                        <span className="text-gray-500">📝 Description:</span>{" "}
                        {report.description}
                      </p>
                      <button
                        onClick={() => handleDelete(report._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700 text-sm"
                        title="Delete report"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>📍 Address:</strong>{" "}
                        {report.location?.address || "Not available"}
                      </p>
                      {report.location?.mapUrl && (
                        <a
                          href={report.location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          🌍 View on Google Maps
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-3 mb-3">
                      📌 <strong>Status:</strong>{" "}
<select
  value={report.status}
  className="ml-2 px-2 py-1 rounded bg-gray-100"
  onChange={async (e) => {
    try {
      const newStatus = e.target.value;

      await axios.patch(`https://mayor-helpline-cleanliness.onrender.com/api/reports/${report._id}`, {
        status: newStatus,
      });

      setReports((prev) =>
        prev.map((r) =>
          r._id === report._id ? { ...r, status: newStatus } : r
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }}
>
  <option value="pending">Pending</option>
  <option value="resolved">Resolved</option>
</select>

                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Submitted on: {new Date(report.createdAt).toLocaleString()}
                    </p>

                    {report.image?.data ? (
                      <img
                        src={`data:${report.image.contentType};base64,${report.image.data}`}
                        alt="Report"
                        className="w-full h-32 object-cover rounded mt-2"
                      />
                    ) : report.image?.filename ? (
                      <img
                        src={`/uploads/${report.image.filename}`}
                        alt="Report"
                        className="w-full h-32 object-cover rounded mt-2"
                      />
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">No image provided.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
