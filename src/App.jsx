import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/hm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctor from "./pages/Doctor";
import Receptionist from "./pages/Receptionist";
import ProtectedRoute from "./components/Protectedroute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageOTRooms from "./pages/ManageOTRooms";
import Contact from "./pages/Contact";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/contact" element={<Contact />} />

        {/* Dashboards */}
        <Route
          path="/Admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute role="receptionist">
              <Receptionist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-ot-rooms"
          element={
            <ProtectedRoute role="admin">
              <ManageOTRooms />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
