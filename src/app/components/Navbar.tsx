"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StorageIcon from "@mui/icons-material/Storage";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";

// Mapping paths to suitable icons
const ICONS_MAP: Record<string, React.ReactNode> = {
  "/dashboard": <DashboardIcon />,
  "/users": <PeopleIcon />,
  "/datasets": <StorageIcon />,
  "/analysis": <ShowChartIcon />,
  "/reports": <DescriptionIcon />,
  "/settings": <SettingsIcon />,
  "/security": <SecurityIcon />,
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Logout handler
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  // Navigation links
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/users", label: "User Management" },
    { href: "/datasets", label: "Dataset Management" },
    { href: "/analysis", label: "Analysis" },
    { href: "/reports", label: "Reports" },
    { href: "/settings", label: "Settings" },
    { href: "/security", label: "Security Controls" },
  ];

  return (
    <aside className="h-full min-h-screen w-72 bg-white flex flex-col items-start py-8 px-6 shadow-lg rounded-tr-3xl rounded-br-3xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/logo.png" alt="CMLRE" className="w-25 h-15 rounded-xl" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-1">
        {navLinks.map(({ href, label }) => (
          <NavItem
            key={href}
            href={href}
            label={label}
            icon={ICONS_MAP[href]}
            active={pathname === href}
          />
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition"
      >
        <LogoutIcon />
        Logout
      </button>

      {/* System Status */}
     
    </aside>
  );
}

// NavItem component
function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} className="w-full">
      <button
        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-base font-medium transition ${
          active ? "bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow" : "text-blue-900 hover:bg-blue-50"
        }`}
      >
        {icon}
        {label}
      </button>
    </Link>
  );
}
