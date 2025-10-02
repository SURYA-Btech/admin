"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Optional: store admin info in localStorage
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("username", adminId);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-transparent z-10">
        <img src="/header.png" alt="CMLRE Header" className="w-full object-cover" />
      </header>

      {/* Background + Login Form */}
      <div
        className="flex-1 flex justify-center items-center relative px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/cover.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md p-10 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl"
        >
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="Govt Logo"
              className="mx-auto w-40 mb-4 drop-shadow-lg"
            />
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              Admin Login
            </h1>
          
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-cyan-200 transition"
                size={24}
              />
              <input
                type="text"
                placeholder="Admin ID"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="group w-full pl-14 pr-4 py-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-cyan-300 focus:outline-none shadow-sm transition"
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 group-focus-within:text-cyan-200 transition"
                size={24}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-cyan-300 focus:outline-none shadow-sm transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,255,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-extrabold shadow-lg shadow-cyan-500/50 transition"
            >
              <LogIn size={24} /> Login
            </motion.button>
          </form>

          <p className="text-center text-gray-300 text-xs mt-10 select-none">
            © 2025 Centre for Marine Living Resources & Ecology
          </p>
        </motion.div>
      </div>
    </div>
  );
}
