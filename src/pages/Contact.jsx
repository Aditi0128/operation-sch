import React from "react";

export default function Contact() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-8">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-12">
        Contact Us
      </h2>
      <form className="space-y-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Message"
          className="w-full px-4 py-2 border rounded-lg"
        ></textarea>
        <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
