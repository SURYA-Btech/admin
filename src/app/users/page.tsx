"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShieldIcon from "@mui/icons-material/Shield";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Snackbar from "@mui/material/Snackbar";

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { initials: "DSC", name: "Dr. Sarah Chen", email: "s.chen@marinelab.org", role: "Researcher", status: "Active", department: "Marine Biology", lastLogin: "2 hours ago", contributions: 47 },
    { initials: "AR", name: "Alex Rivera", email: "a.rivera@university.edu", role: "Student", status: "Active", department: "Ocean Sciences", lastLogin: "1 day ago", contributions: 12 },
    { initials: "DMK", name: "Dr. Michael Kim", email: "m.kim@research.gov", role: "Admin", status: "Active", department: "Data Management", lastLogin: "30 minutes ago", contributions: 89 },
    { initials: "ET", name: "Emma Thompson", email: "e.thompson@institute.org", role: "Researcher", status: "Pending", department: "Oceanography", lastLogin: "Never", contributions: 0 },
    { initials: "DJW", name: "Dr. James Wilson", email: "j.wilson@marine.edu", role: "Researcher", status: "Active", department: "Fisheries Science", lastLogin: "3 hours ago", contributions: 34 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Researcher", department: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Handle input
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Add or Edit user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department) return alert("All fields are required");

    const initials = formData.name.split(" ").map(n => n[0]).join("").toUpperCase();

    if (editingIndex !== null) {
      // Edit user
      const updated = [...users];
      updated[editingIndex] = { ...updated[editingIndex], ...formData, initials };
      setUsers(updated);
    } else {
      // Add user
      setUsers(prev => [...prev, { ...formData, initials, status: "Pending", lastLogin: "Never", contributions: 0 }]);
    }

    setModalOpen(false);
    setSnackbarOpen(true);
    setFormData({ name: "", email: "", role: "Researcher", department: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData({ ...users[index] });
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleApprove = (index) => {
    const updated = [...users];
    updated[index].status = "Active";
    setUsers(updated);
  };

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === "All Roles" || user.role === roleFilter) &&
    (statusFilter === "All Status" || user.status === statusFilter)
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen bg-[#fafcff] text-white">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-auto">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Users" value={users.length} icon={<PeopleAltIcon className="text-blue-600" />} />
          <StatCard label="Active Users" value={users.filter(u => u.status === "Active").length} icon={<ShieldIcon className="text-green-600" />} />
          <StatCard label="Pending" value={users.filter(u => u.status === "Pending").length} icon={<ScheduleIcon className="text-yellow-500" />} />
          <StatCard label="Researchers" value={users.filter(u => u.role === "Researcher").length} icon={<TrendingUpIcon className="text-blue-500" />} />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-2xl px-7 py-7">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldIcon className="text-blue-600" /> User Directory
            </h2>
            <div className="flex flex-1 justify-end gap-2 items-center">
              <div className="flex items-center bg-slate-100 px-4 py-2 rounded-xl shadow-inner">
                <SearchIcon className="text-gray-400 mr-2" />
                <input type="text" placeholder="Search users..." className="bg-transparent outline-none text-gray-700 w-[160px] md:w-48" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <select className="ml-3 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 outline-none focus:ring-2" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                <option>All Roles</option>
                <option>Researcher</option>
                <option>Admin</option>
                <option>Student</option>
              </select>
              <select className="ml-3 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 outline-none focus:ring-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
              <button onClick={() => { setModalOpen(true); setEditingIndex(null); }} className="ml-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow hover:from-blue-700 hover:to-blue-600 transition">
                <AddIcon fontSize="small" /> Add User
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-600 border-b border-gray-100 text-sm">
                <th className="pb-4 font-semibold">User</th>
                <th className="pb-4 font-semibold">Role</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Department</th>
                <th className="pb-4 font-semibold">Last Login</th>
                <th className="pb-4 font-semibold">Contributions</th>
                <th className="pb-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              {filteredUsers.map((user, i) => (
                <tr key={i} className="border-b last:border-none border-gray-100 hover:bg-blue-50 transition">
                  <td className="py-5 flex items-center gap-4 min-w-[180px]">
                    <span className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 font-semibold text-lg shadow-sm">{user.initials}</span>
                    <div>
                      <div className="font-semibold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </td>
                  <td><span className={`px-3 py-1 text-xs rounded-full font-semibold ${user.role === "Admin" ? "bg-orange-100 text-orange-600" : user.role === "Researcher" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{user.role}</span></td>
                  <td><span className={`px-3 py-1 text-xs rounded-full font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-600"}`}>{user.status}</span></td>
                  <td><span className="text-[15px] text-slate-700">{user.department}</span></td>
                  <td><span className="flex items-center gap-1 text-[15px] text-slate-500">{user.lastLogin}</span></td>
                  <td><span className="flex items-center gap-1 font-medium text-blue-600">{user.contributions}</span></td>
                  <td className="flex gap-2">
                    {user.status === "Pending" && <button onClick={() => handleApprove(i)} className="bg-green-100 text-green-700 rounded-full p-2 hover:bg-green-200 transition"><CheckCircleIcon fontSize="small" /></button>}
                    <button onClick={() => handleEdit(i)} className="bg-slate-100 text-blue-700 rounded-full p-2 hover:bg-blue-100 transition"><EditIcon fontSize="small" /></button>
                    <button onClick={() => handleDelete(i)} className="bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 transition"><DeleteOutlineIcon fontSize="small" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal onClose={() => { setModalOpen(false); setEditingIndex(null); }}>
          <form className="flex flex-col gap-4 text-slate-800" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-2">{editingIndex !== null ? "Edit User" : "Add New User"}</h3>
            <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded-md" value={formData.name} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" className="border p-2 rounded-md" value={formData.email} onChange={handleInputChange} required />
            <input type="text" name="department" placeholder="Department" className="border p-2 rounded-md" value={formData.department} onChange={handleInputChange} required />
            <select name="role" className="border p-2 rounded-md" value={formData.role} onChange={handleInputChange}>
              <option>Researcher</option>
              <option>Admin</option>
              <option>Student</option>
            </select>
            <div className="flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => { setModalOpen(false); setEditingIndex(null); }} className="px-4 py-2 rounded-md border hover:bg-gray-100">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">{editingIndex !== null ? "Save Changes" : "Add User"}</button>
            </div>
          </form>
        </Modal>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message={editingIndex !== null ? "User updated!" : "User added!"} />
    </div>
  );
}

// Modal Component
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        {children}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold">✕</button>
      </div>
    </div>
  );
}

// StatCard component
function StatCard({ label, value, icon }) {
  return (
    <div className="relative rounded-xl shadow-md bg-white p-7 flex items-center gap-7 border border-blue-100">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
