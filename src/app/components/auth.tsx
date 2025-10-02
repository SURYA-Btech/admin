"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthProps {
  children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token → redirect to login
      router.push("/");
    } else {
      // Token exists → allow access
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    // Optional: loading spinner while checking
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
