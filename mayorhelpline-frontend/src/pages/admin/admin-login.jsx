import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("https://mayor-helpline-cleanliness.onrender.com/api/admin/login", {
      email,
      password,
    });
    if (!res.data || !res.data.success || !res.data.token) {
  alert("Invalid login. Please try again.");
  return;
}


    localStorage.setItem("adminToken", res.data.token);
    navigate("/admin/dashboard");
  } catch (err) {
    console.error("Login failed:", err);
    setError("Login failed. Please check credentials.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </form>
     
    </div>
    
  );
};

export default AdminLogin;
