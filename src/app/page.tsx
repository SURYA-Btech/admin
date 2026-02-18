"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState<{adminId?: string; password?: string}>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { adminId?: string; password?: string } = {};

    if (!adminId.trim()) newErrors.adminId = "Admin ID is required";
    if (!password.trim()) newErrors.password = "Password is required";

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("username", adminId);
      router.push("/dashboard");
    } catch {
      // setErrors({ adminId: "Login failed", password: "Please try again" });
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="w-full z-10">
        <Image
          src="/header.png"
          alt="CMLRE Header"
          width={1920}
          height={200}
          className="w-full object-cover"
        />
      </header>

      <div
        className="flex-1 flex justify-center items-center relative px-6 bg-cover bg-center min-h-screen"
        style={{ backgroundImage: "url('/cover.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md p-12 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl"
        >
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Govt Logo"
              width={160}
              height={160}
              className="mx-auto mb-4 drop-shadow-lg"
            />
            <h1 className="text-3xl font-extrabold text-white">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={24} />
              <input
                type="text"
                placeholder="Admin ID"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-cyan-300 outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={24} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-cyan-300 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-extrabold shadow-lg"
            >
              {isLoading ? "Loading..." : <><LogIn size={24} /> Login</>}
            </motion.button>
          </form>

          <p className="text-center text-gray-300 text-xs mt-10">
            © {new Date().getFullYear()} Centre for Marine Living Resources & Ecology
          </p>
        </motion.div>
      </div>
    </div>
  );
}
