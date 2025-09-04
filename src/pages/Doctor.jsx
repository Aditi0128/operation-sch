import React from "react";
import Navbar from "../components/Navbar";
import OTScheduler from "../modules/OTScheduler";

export default function Doctor() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-8xl mx-auto p-6 min-h-screen bg-gradient-to-br from-[#C1EFFF] via-[#7AC1EB] to-[#005F6B]">
        {/* Header Card */}
        <div className="bg-white/80 mb-6 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition duration-300 hover:shadow-3xl border border-gray-100">
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 tracking-wide drop-shadow-md">
            Doctor Dashboard
          </h1>
          <p className="text-gray-500 text-1xl font-bold text-center py-2 ">
            View your assigned operating theatre schedule and add post-op notes.
          </p>
        </div>

        {/* Scheduler Card */}
        <div className="bg-white/80 mb-6 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-100">
          <h3> Please select the time block on the calender to schedule.</h3>
          <OTScheduler role="doctor" />
        </div>
      </div>
    </div>
  );
}
