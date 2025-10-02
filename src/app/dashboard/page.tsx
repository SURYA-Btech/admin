"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InfoIcon from "@mui/icons-material/Info";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BackupIcon from "@mui/icons-material/Backup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Snackbar from "@mui/material/Snackbar";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Users state
  const [users, setUsers] = useState([
    {
      initials: "DSC",
      name: "Dr. Sarah Chen",
      email: "s.chen@marinelab.org",
      role: "Researcher",
      status: "Active",
      lastLogin: "2 hours ago",
      contributions: 47,
    },
    {
      initials: "AR",
      name: "Alex Rivera",
      email: "a.rivera@university.edu",
      role: "Student",
      status: "Active",
      lastLogin: "1 day ago",
      contributions: 12,
    },
    {
      initials: "DMK",
      name: "Dr. Michael Kim",
      email: "m.kim@research.gov",
      role: "Admin",
      status: "Active",
      lastLogin: "30 minutes ago",
      contributions: 89,
    },
    {
      initials: "ET",
      name: "Emma Thompson",
      email: "e.thompson@institute.org",
      role: "Researcher",
      status: "Pending",
      lastLogin: "Never",
      contributions: 0,
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Researcher",
  });

  const toggleInviteOpen = () => setInviteOpen(!inviteOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please enter Name and Email");
      return;
    }

    // Generate initials
    const initials = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    // Add new user to the users list
    setUsers((prev) => [
      ...prev,
      {
        initials,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "Pending",
        lastLogin: "Never",
        contributions: 0,
      },
    ]);

    setInviteOpen(false);
    setSnackbarOpen(true);

    setFormData({ name: "", email: "", role: "Researcher" });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className={`min-h-screen flex bg-slate-100 ${inter.className}`}>
      {/* Sidebar */}
      <div className="sticky top-0 h-screen bg-[#fafcff] text-white">
        <Navbar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center p-6 bg-[#144d99] shadow-lg text-white">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <span className="text-sm">Last updated: 2 minutes ago</span>
            <NotificationsNoneIcon />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100">
          {/* Top stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <InfoCard icon={<PeopleIcon />} title="Total Users" main={users.length} sub="+12% from last month" />
            <InfoCard icon={<StorageIcon />} title="Active Datasets" main="589" sub="+8 new today" />
            <InfoCard icon={<CheckCircleOutlineIcon />} title="System Health" main="99.2%" sub="All systems operational" />
          </div>

          {/* User table + activity */}
          <div className="grid grid-cols-2 gap-7">
            {/* User Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
                  <InfoIcon className="text-blue-600" fontSize="small" />
                  User Management
                </h2>
                <button
                  onClick={toggleInviteOpen}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:from-blue-700 hover:to-blue-600 flex items-center gap-2 transition"
                >
                  <MailOutlineIcon fontSize="small" /> Invite User
                </button>
              </div>

              {/* User table */}
              <table className="w-full mt-2">
                <thead>
                  <tr className="text-left text-blue-600 font-medium border-b border-slate-200">
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Contributions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <UserRow key={idx} {...user} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-slate-800">
                <ArrowUpwardIcon className="text-blue-600" fontSize="small" />
                Recent Activity
              </h2>
              <ActivityRow
                icon={<ArrowUpwardIcon className="text-blue-600" />}
                title="New eDNA Dataset Uploaded"
                description="Pacific_Kelp_Forest_2024.csv uploaded by Dr. Sarah Chen"
                tag="success"
                time="5 minutes ago"
              />
              <ActivityRow
                icon={<CheckCircleOutlineIcon className="text-blue-600" />}
                title="Otolith Analysis Completed"
                description="Species identification analysis for 47 specimens completed"
                tag="success"
                time="12 minutes ago"
              />
              <ActivityRow
                icon={<InfoIcon className="text-blue-600" />}
                title="New User Registration"
                description="Emma Thompson requested researcher access"
                tag="info"
                time="1 hour ago"
              />
              <ActivityRow
                icon={<WarningAmberIcon className="text-yellow-500" />}
                title="High Server Load Detected"
                description="Oceanography module experiencing increased processing time"
                tag="warning"
                time="2 hours ago"
              />
              <ActivityRow
                icon={<BackupIcon className="text-blue-600" />}
                title="Backup Completed"
                description="Daily database backup completed successfully"
                tag="success"
                time="3 hours ago"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="User invited successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      {/* Invite User Modal */}
      <Modal open={inviteOpen} onClose={toggleInviteOpen}>
        <form onSubmit={handleInviteSubmit} className="flex flex-col gap-4 text-slate-800">
          <h3 className="text-xl font-semibold mb-4">Invite New User</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="Researcher">Researcher</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={toggleInviteOpen}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ===== COMPONENTS ===== */
function InfoCard({ icon, title, main, sub }) {
  return (
    <div className="rounded-2xl shadow-md p-6 flex items-center gap-6 bg-white border border-blue-100">
      <div className="rounded-xl p-3 bg-blue-100 text-blue-700">{icon}</div>
      <div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-800">{main}</div>
        <div className="text-xs text-blue-600">{sub}</div>
      </div>
    </div>
  );
}

function UserRow({ initials, name, email, role, status, lastLogin, contributions }) {
  const roleColor =
    role === "Admin"
      ? "bg-blue-100 text-blue-800"
      : role === "Researcher"
      ? "bg-blue-50 text-blue-700"
      : "bg-slate-100 text-slate-700";

  const statusColor = status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";

  return (
    <tr className="border-b border-slate-200 hover:bg-blue-50 transition">
      <td className="py-3 flex items-center gap-3">
        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-2 font-bold text-sm">{initials}</span>
        <div>
          <div className="font-semibold text-slate-800">{name}</div>
          <div className="text-xs text-slate-500">{email}</div>
        </div>
      </td>
      <td>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor}`}>{role}</span>
      </td>
      <td>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColor}`}>{status}</span>
      </td>
      <td className="text-xs text-slate-500">{lastLogin}</td>
      <td className="text-sm font-medium text-slate-700">{contributions}</td>
      <td>
        <MoreHorizIcon className="text-slate-400" />
      </td>
    </tr>
  );
}

function ActivityRow({ icon, title, description, tag, time }) {
  const bg =
    tag === "success"
      ? "bg-green-100 text-green-700"
      : tag === "info"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="border-b last:border-none py-5 flex items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="bg-blue-50 rounded-full p-2 flex items-center justify-center">{icon}</div>
        <div>
          <div className="font-semibold text-slate-800">{title}</div>
          <div className="text-sm text-slate-500">{description}</div>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[100px]">
        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${bg}`}>{tag}</span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <AccessTimeIcon fontSize="inherit" className="mr-1" />
          {time}
        </span>
      </div>
    </div>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">{children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
