import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">OT Scheduler</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">logout</Link>
      </div>
    </nav>
  );
}
