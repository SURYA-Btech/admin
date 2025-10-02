"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

import StorageIcon from "@mui/icons-material/Storage";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import PieChartIcon from "@mui/icons-material/PieChart";

const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const totalUsers = [120, 175, 250, 340, 450, 600, 750, 892, 900];
const activeUsers = [70, 110, 160, 220, 290, 410, 520, 634, 634];
const speciesCounts = [2, 7, 13, 11, 15, 19, 24, 28, 27];
const distribution = [
  { label: "eDNA", value: 38, color: "#2563eb" },
  { label: "Otolith", value: 29, color: "#16a34a" },
  { label: "Ocean Data", value: 20, color: "#ca8a04" },
  { label: "Life History", value: 14, color: "#dc2626" },
];

export default function AnalyticsInsights() {
  const [userFilter, setUserFilter] = useState("both"); // active | total | both
  const [monthRange, setMonthRange] = useState([0, allMonths.length - 1]); // indexes

  // Slice months and data based on monthRange
  const filteredMonths = allMonths.slice(monthRange[0], monthRange[1] + 1);
  const filteredTotalUsers = totalUsers.slice(monthRange[0], monthRange[1] + 1);
  const filteredActiveUsers = activeUsers.slice(monthRange[0], monthRange[1] + 1);
  const filteredSpeciesCounts = speciesCounts.slice(monthRange[0], monthRange[1] + 1);

  // Data for LineChart based on userFilter
  const userGrowthData = filteredMonths.map((month, idx) => {
    const obj = { month };
    if (userFilter === "both" || userFilter === "total") obj["Total Users"] = filteredTotalUsers[idx];
    if (userFilter === "both" || userFilter === "active") obj["Active Users"] = filteredActiveUsers[idx];
    return obj;
  });

  // Data for BarChart for species detection
  const speciesData = filteredMonths.map((month, idx) => ({
    month,
    SpeciesDetected: filteredSpeciesCounts[idx],
  }));

  return (
    <div className="flex min-h-screen bg-[#f7fafd]">
      <aside className="sticky top-0 h-screen">
        <Navbar />
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        <h3 className="text-3xl font-extrabold text-blue-700 mb-4">Analytics & Insights</h3>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Species Detected"
            value="478"
            note="+12 this month"
            icon={<InsightsIcon fontSize="large" />}
            bgColor="bg-blue-600"
          />
          <StatCard
            label="Analyses Completed"
            value="1,247"
            note="95% success rate"
            icon={<BarChartIcon fontSize="large" />}
            bgColor="bg-green-600"
          />
          <StatCard
            label="Data Processed"
            value="15.2 TB"
            note="This quarter"
            icon={<StorageIcon fontSize="large" />}
            bgColor="bg-yellow-600"
          />
          <StatCard
            label="Active Researchers"
            value="634"
            note="21% increase"
            icon={<GroupIcon fontSize="large" />}
            bgColor="bg-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* User Growth with Inline Filters */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center text-2xl font-bold text-gray-800">
                <TimelineIcon className="text-blue-600 mr-2" />
                User Growth Trends
              </div>
              {/* Filters container */}
              <div className="flex flex-wrap gap-4 items-center">
                <label htmlFor="userFilter" className="text-sm font-semibold text-gray-800">
                  Show:
                </label>
                <select
                  id="userFilter"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                >
                  <option value="both">Both</option>
                  <option value="total">Total Users</option>
                  <option value="active">Active Users</option>
                </select>

                <label htmlFor="startMonth" className="text-sm font-semibold text-gray-800">
                  From:
                </label>
                <select
                  id="startMonth"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={monthRange[0]}
                  onChange={(e) => {
                    const newStart = Math.min(Number(e.target.value), monthRange[1]);
                    setMonthRange([newStart, monthRange[1]]);
                  }}
                >
                  {allMonths.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>

                <label htmlFor="endMonth" className="text-sm font-semibold text-gray-800">
                  To:
                </label>
                <select
                  id="endMonth"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={monthRange[1]}
                  onChange={(e) => {
                    const newEnd = Math.max(Number(e.target.value), monthRange[0]);
                    setMonthRange([monthRange[0], newEnd]);
                  }}
                >
                  {allMonths.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" stroke="#444" />
                <YAxis domain={[0, 1000]} stroke="#666" />
                <Tooltip />
                <Legend verticalAlign="bottom" height={30} />
                {(userFilter === "both" || userFilter === "total") && (
                  <Line
                    type="monotone"
                    dataKey="Total Users"
                    stroke="#2563eb"
                    fillOpacity={0.3}
                    fill="#2563eb"
                    strokeWidth={2}
                  />
                )}
                {(userFilter === "both" || userFilter === "active") && (
                  <Line
                    type="monotone"
                    dataKey="Active Users"
                    stroke="#16a34a"
                    fillOpacity={0.3}
                    fill="#16a34a"
                    strokeWidth={2}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center text-2xl font-bold text-gray-800 mb-4">
              <PieChartIcon className="text-red-600 mr-2" />
              Dataset Distribution
            </div>
            <ResponsiveContainer width={160} height={250}>
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ label, percent }) =>
                    `${label} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart for Species Detection */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center text-xl font-bold text-gray-800 mb-2">
              <BarChartIcon className="text-blue-600 mr-2" />
              Species Detection Over Time
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={speciesData}>
                <XAxis dataKey="month" stroke="#444" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="SpeciesDetected" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Performance */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center text-xl font-bold text-gray-800 mb-2">
              <StorageIcon className="text-yellow-600 mr-2" />
              System Performance
            </div>
            <p className="mb-2 text-gray-700">
              API Response Times (ms): 115{" "}
              <span className="text-green-700 font-bold">(optimal)</span>
            </p>
            <div className="h-5 bg-green-100 rounded-lg overflow-hidden">
              <div
                className="bg-green-700 h-full rounded-lg"
                style={{ width: "75%" }}
              />
            </div>
            <p className="mt-3 text-gray-500 text-sm">
              Based on most recent 200 requests.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Stat card with icon in circle background, text visible and contrast correct
function StatCard({ label, value, note, icon, bgColor }) {
  return (
    <div className={`rounded-xl shadow p-8 flex items-center gap-7 ${bgColor}`}>
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-gray-900 text-3xl shadow-md">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-2xl font-extrabold mt-2 mb-1 text-white">{value}</div>
        {note && <div className="text-xs text-white/90">{note}</div>}
      </div>
    </div>
  );
}
