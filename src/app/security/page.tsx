"use client";
import Navbar from "../components/Navbar";
import ShieldIcon from "@mui/icons-material/Shield";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactNode } from "react";

export default function SecurityCenterPage() {
  const events = [
    {
      event: "Multiple failed login attempts detected",
      description: "Failed Login",
      severity: "MEDIUM",
      user: "unknown",
      ip: "192.168.1.100",
      location: "New York, US",
      time: "2 hours ago",
      status: "active",
    },
    {
      event: "Unusual data access pattern detected",
      description: "Suspicious Activity",
      severity: "HIGH",
      user: "alex.rivera@university.edu",
      ip: "10.0.0.45",
      location: "California, US",
      time: "4 hours ago",
      status: "investigating",
    },
    {
      event: "Large dataset download after hours",
      description: "Data Access",
      severity: "LOW",
      user: "dr.chen@marinelab.org",
      ip: "172.16.0.23",
      location: "Massachusetts, US",
      time: "6 hours ago",
      status: "resolved",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7fafd]">
      {/* Sticky Navbar */}
      <div className="sticky top-0 h-screen">
        <Navbar />
      </div>
      <div className="flex-1 p-10 overflow-auto">
        {/* Title & Desc */}
        <div className="mb-3">

        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Active Threats"
            value="0"
            icon={<ErrorOutlineIcon className="text-red-500" />}
            bgColor="bg-red-50"
            textColor="text-red-500"
          />
          <StatCard
            label="Investigating"
            value="1"
            icon={<WarningAmberIcon className="text-yellow-500" />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
          />
          <StatCard
            label="Resolved Today"
            value="1"
            icon={<CheckCircleOutlineIcon className="text-green-700" />}
            bgColor="bg-green-50"
            textColor="text-green-700"
          />
          <StatCard
            label="Security Score"
            value="95%"
            subLabel="System Health"
            icon={<ShieldIcon className="text-blue-500" />}
            bgColor="bg-blue-500"
            textColor="text-white"
          />
        </div>

        {/* Security Events Table */}
        <div className="bg-white shadow rounded-2xl px-7 py-7 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldIcon className="text-blue-500" /> Security Events
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl shadow-inner">
                <SearchIcon className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="bg-transparent outline-none text-gray-700 w-32 sm:w-52"
                />
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition">Monitor</button>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-100 text-sm">
                <th className="pb-3">Event</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">User/IP</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {events.map((e, i) => (
                <tr key={i} className="border-b last:border-none border-gray-100 hover:bg-[#f9f9fd] transition">
                  <td className="py-4">
                    <div className="font-semibold text-gray-900">{e.event}</div>
                    <div className="text-xs text-gray-400">{e.description}</div>
                  </td>
                  <td>
                    <SeverityBadge severity={e.severity} />
                  </td>
                  <td>
                    <div className="text-sm flex flex-col">
                      <span className="text-gray-700">{e.user}</span>
                      <span className="text-xs text-gray-700">{e.ip}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-gray-500">{e.location}</span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-400">{e.time}</span>
                  </td>
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className={`rounded-full p-1.5 ${e.status === "resolved" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`} title="Acknowledge">
                        <CheckIcon fontSize="small" />
                      </button>
                      <button className="bg-red-100 text-red-600 rounded-full p-1.5 hover:bg-red-200 transition" title="Dismiss">
                        <CancelIcon fontSize="small" />
                      </button>
                      <button className="bg-gray-100 text-gray-700 rounded-full p-1.5 hover:bg-gray-200 transition" title="View Details">
                        <RemoveRedEyeIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controls and Logs */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-2xl px-7 py-7">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldIcon className="text-blue-400" /> Access Controls
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-700">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-700">Required for all admin accounts</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-sm text-gray-700">IP Whitelisting</div>
                  <div className="text-sm text-gray-700">Restrict access by IP address</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Partial</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-2xl px-7 py-7">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircleOutlineIcon className="text-green-600" /> Audit Logs
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-700 ">Login Tracking</div>
                  <div className="text-sm text-gray-700">Monitor all authentication events</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-sm text-gray-700">Data Access Logs</div>
                  <div className="text-sm text-gray-700">Track dataset downloads and views</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  subLabel?: string;
}

function StatCard({ label, value, icon, bgColor, textColor, subLabel }: StatCardProps) {
  return (
    <div className={`rounded-xl shadow p-6 flex items-center gap-6 ${bgColor}`}>
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/20">{icon}</div>
      <div>
        <div className={`text-sm font-bold ${textColor}`}>{label}</div>
        <div className={`text-2xl font-extrabold mt-2 mb-1 ${textColor}`}>{value}</div>
        {subLabel && <div className={`text-xs ${textColor}`}>{subLabel}</div>}
      </div>
    </div>
  );
}

interface SeverityBadgeProps {
  severity: string;
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const color =
    severity === "HIGH"
      ? "bg-orange-100 text-orange-600"
      : severity === "MEDIUM"
        ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-700";
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full ${color}`}>
      {severity}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const color =
    status === "active"
      ? "bg-red-100 text-red-500"
      : status === "investigating"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
}
