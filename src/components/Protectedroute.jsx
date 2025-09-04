// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, role, loading } = useAuth();

  // Show loading state while Firebase is checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is empty OR role matches → allow access
  if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
    return children;
  }

  // Otherwise → redirect home
  return <Navigate to="/" replace />;
}
