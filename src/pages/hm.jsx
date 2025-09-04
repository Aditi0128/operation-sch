import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white text-gray-800 font-[Poppins] min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">
          Operation Scheduler
        </h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-indigo-600 transition">
            About
          </a>
          <Link to="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>
          <Link to="/login" className="hover:text-indigo-600 transition">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto">
        <div className="md:w-1/2 space-y-6 animate-fadeIn">
          <h2 className="text-5xl font-extrabold leading-tight">
            Manage <span className="text-indigo-600">OT Scheduling</span>{" "}
            Seamlessly
          </h2>
          <p className="text-lg text-gray-600">
            Plan, track, and coordinate operation theater schedules with zero
            conflicts and maximum efficiency.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:scale-105 hover:bg-indigo-700 transform transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transform transition"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center animate-float">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4006/4006111.png"
            alt="Operation Scheduling"
            className="w-80 h-80 object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Scheduling",
              desc: "Automatically resolve conflicts and optimize schedules.",
              icon: "📅",
            },
            {
              title: "Real-time Updates",
              desc: "Stay synced with live OT status and notifications.",
              icon: "⏱️",
            },
            {
              title: "Analytics & Reports",
              desc: "Gain insights into efficiency and usage patterns.",
              icon: "📊",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-indigo-600">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
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
            We empower hospitals with tools to streamline OT scheduling,
            minimize delays, and improve patient outcomes through smart,
            collaborative workflows.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Operation Scheduler. All rights reserved.
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
