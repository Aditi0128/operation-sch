import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { logger } from "../lib/logger";

const log = logger("Login");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function doLogin(e) {
    e.preventDefault();
    log.info("Login attempt", { email });

    try {
      const res = await loginUser({ email, password });
      log.info("Login success", res);

      const role = res.meta?.role || "user";
      log.info("Role detected", { role });

      if (role === "admin") nav("/admin");
      else if (role === "receptionist") nav("/receptionist");
      else if (role === "doctor") nav("/doctor");
      else nav("/");
    } catch (err) {
      log.error("Login failed", err);
      setErr(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please sign in to continue
        </p>

        <form onSubmit={doLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          {err && (
            <div className="text-red-500 text-sm text-center mt-1">{err}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transform hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          No account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
