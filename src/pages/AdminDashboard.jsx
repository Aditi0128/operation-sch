import React from "react";
import Navbar from "../components/Navbar";
import ManageDoctors from "./ManageDoctors";
import ManagePatients from "./ManagePatients";
import OTScheduler from "../modules/OTScheduler";


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C1EFFF] via-[#7AC1EB] to-[#005F6B]">
      {/* Navbar */}
      <Navbar title="Operation Scheduler" />

      {/* Dashboard content */}
      <div className="p-6 max-w-7xl mx-auto mt-6 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition duration-300 hover:shadow-3xl border border-gray-100 text-4xl font-extrabold text-center text-indigo-600 tracking-wide drop-shadow-md">
          Admin Dashboard
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition duration-300 hover:shadow-3xl border border-gray-100">
            <ManageDoctors />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition duration-300 hover:shadow-3xl border border-gray-100">
            <ManagePatients />
          </div>
        </div>

        {/* OT Scheduler Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition duration-300 hover:shadow-3xl border border-gray-100">
          <OTScheduler role="admin" />
        </section>
      </div>
    </div>
  );
}
