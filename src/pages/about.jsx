import React from "react";

export default function About() {
  return (
    <div
      className="relative py-20 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581090700227-4c4f50b8d4e6?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">About Operation Scheduler</h2>
        <p className="text-lg leading-relaxed">
          We empower hospitals with tools to streamline OT scheduling, minimize
          delays, and improve patient outcomes through smart, collaborative
          workflows.
        </p>
      </div>
    </div>
  );
}
