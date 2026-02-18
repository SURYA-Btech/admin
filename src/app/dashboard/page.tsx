"use client";
import { useState, ChangeEvent, FormEvent, ReactNode, SyntheticEvent } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Snackbar from "@mui/material/Snackbar";

const inter = Inter({ subsets: ["latin"] });

type User = {
  initials: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  contributions: number;
};

export default function DashboardPage() {
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Researcher",
  });

  const toggleInviteOpen = () => setInviteOpen((prev) => !prev);

  // ✅ Properly typed input handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Properly typed submit handler
  const handleInviteSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please enter Name and Email");
      return;
    }

    const initials = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

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

  const handleSnackbarClose = (
    _event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className={`min-h-screen flex bg-slate-100 ${inter.className}`}>
      {/* Sidebar */}
      <div className="sticky top-0 h-screen bg-[#fafcff]">
        <Navbar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex justify-between items-center p-6 bg-[#144d99] shadow-lg text-white">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <span className="text-sm">Last updated: 2 minutes ago</span>
            <NotificationsNoneIcon />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <InfoCard icon={<PeopleIcon />} title="Total Users" main={users.length} sub="+12% from last month" />
            <InfoCard icon={<StorageIcon />} title="Active Datasets" main="589" sub="+8 new today" />
            <InfoCard icon={<CheckCircleOutlineIcon />} title="System Health" main="99.2%" sub="All systems operational" />
          </div>

          <div className="grid grid-cols-2 gap-7">
            {/* Users */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-slate-800">
                  <InfoIcon className="text-blue-600" fontSize="small" />
                  User Management
                </h2>

                <button
                  onClick={toggleInviteOpen}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <MailOutlineIcon fontSize="small" />
                  Invite User
                </button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-left text-blue-600 border-b">
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

            {/* Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-slate-800">
                <ArrowUpwardIcon className="text-blue-600" fontSize="small" />
                Recent Activity
              </h2>

              <ActivityRow
                title="High Server Load Detected"
                description="Oceanography module experiencing increased processing time"
                time="2 hours ago"
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

      {/* Modal */}
      <Modal open={inviteOpen} onClose={toggleInviteOpen}>
        <form onSubmit={handleInviteSubmit} className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Invite New User</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded-md p-2"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded-md p-2"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="Researcher">Researcher</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>

          <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Send Invite
          </button>
        </form>
      </Modal>
    </div>
  );
}

/* COMPONENTS */

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  main: string | number;
  sub: string;
}

function InfoCard({ icon, title, main, sub }: InfoCardProps) {
  return (
    <div className="rounded-2xl shadow-md p-6 flex items-center gap-4 bg-white">
      <div className="bg-blue-100 p-3 rounded-xl text-blue-700">{icon}</div>
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold">{main}</div>
        <div className="text-xs text-blue-600">{sub}</div>
      </div>
    </div>
  );
}

function UserRow({ name, role, status, lastLogin, contributions }: User) {
  return (
    <tr className="border-b">
      <td>{name}</td>
      <td>{role}</td>
      <td>{status}</td>
      <td>{lastLogin}</td>
      <td>{contributions}</td>
      <td><MoreHorizIcon /></td>
    </tr>
  );
}

interface ActivityRowProps {
  title: string;
  description: string;
  time: string;
}

function ActivityRow({ title, description, time }: ActivityRowProps) {
  return (
    <div className="border-b py-3">
      <div>{title}</div>
      <div className="text-sm text-slate-500">{description}</div>
      <div className="text-xs">{time}</div>
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl relative">
        {children}
        <button onClick={onClose} className="absolute top-2 right-3">✕</button>
      </div>
    </div>
  );
}
