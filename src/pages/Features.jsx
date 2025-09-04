import React from "react";

export default function Features() {
  const features = [
    { title: "Smart Scheduling", desc: "Automatically resolve conflicts and optimize schedules.", icon: "📅" },
    { title: "Real-time Updates", desc: "Stay synced with live OT status and notifications.", icon: "⏱️" },
    { title: "Analytics & Reports", desc: "Gain insights into efficiency and usage patterns.", icon: "📊" },
  ];

  return (
    <div className="py-16 max-w-6xl mx-auto px-8">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-12">Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold text-indigo-600">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
