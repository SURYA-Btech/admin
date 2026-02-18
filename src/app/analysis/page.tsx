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
  PieLabelRenderProps,
} from "recharts";

import StorageIcon from "@mui/icons-material/Storage";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import PieChartIcon from "@mui/icons-material/PieChart";

// Static sample data
const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const totalUsers = [120, 175, 250, 340, 450, 600, 750, 892, 900];
const activeUsers = [70, 110, 160, 220, 290, 410, 520, 634, 634];
const speciesCounts = [2, 7, 13, 11, 15, 19, 24, 28, 27];

// Pie data type
type PieDataItem = {
  label: string;
  value: number;
  color: string;
};

const distribution: PieDataItem[] = [
  { label: "eDNA", value: 38, color: "#2563eb" },
  { label: "Otolith", value: 29, color: "#16a34a" },
  { label: "Ocean Data", value: 20, color: "#ca8a04" },
  { label: "Life History", value: 14, color: "#dc2626" },
];

type UserFilterType = "both" | "total" | "active";

export default function AnalyticsInsights() {
  const [userFilter, setUserFilter] = useState<UserFilterType>("both");
  const [monthRange, setMonthRange] = useState<[number, number]>([
    0,
    allMonths.length - 1,
  ]);

  // Filter data based on month range
  const filteredMonths = allMonths.slice(monthRange[0], monthRange[1] + 1);
  const filteredTotalUsers = totalUsers.slice(monthRange[0], monthRange[1] + 1);
  const filteredActiveUsers = activeUsers.slice(monthRange[0], monthRange[1] + 1);
  const filteredSpeciesCounts = speciesCounts.slice(monthRange[0], monthRange[1] + 1);

  // LineChart data
  const userGrowthData = filteredMonths.map((month, idx) => {
    const obj: Record<string, number | string> = { month };

    if (userFilter === "both" || userFilter === "total") {
      obj["Total Users"] = filteredTotalUsers[idx];
    }

    if (userFilter === "both" || userFilter === "active") {
      obj["Active Users"] = filteredActiveUsers[idx];
    }

    return obj;
  });

  // BarChart data
  const speciesData = filteredMonths.map((month, idx) => ({
    month,
    SpeciesDetected: filteredSpeciesCounts[idx],
  }));

  // ✅ Type-safe Pie label renderer (Option 2)
  const renderPieLabel = (
    props: PieLabelRenderProps & { payload?: PieDataItem }
  ) => {
    const { payload, percent, x, y } = props;

    const safePercent = typeof percent === "number" ? percent : 0;

    if (!payload) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        fontSize={12}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${payload.label} ${(safePercent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f7fafd]">
      <aside className="sticky top-0 h-screen">
        <Navbar />
      </aside>

      <main className="flex-1 p-10 overflow-auto">
        <h3 className="text-3xl font-extrabold text-blue-700 mb-4">
          Analytics & Insights
        </h3>

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
          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center text-2xl font-bold text-gray-800">
                <TimelineIcon className="text-blue-600 mr-2" />
                User Growth Trends
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <label className="text-sm font-semibold">Show:</label>
                <select
                  value={userFilter}
                  onChange={(e) =>
                    setUserFilter(e.target.value as UserFilterType)
                  }
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  <option value="both">Both</option>
                  <option value="total">Total Users</option>
                  <option value="active">Active Users</option>
                </select>

                <label className="text-sm font-semibold">From:</label>
                <select
                  value={monthRange[0]}
                  onChange={(e) => {
                    const newStart = Math.min(
                      Number(e.target.value),
                      monthRange[1]
                    );
                    setMonthRange([newStart, monthRange[1]]);
                  }}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  {allMonths.map((m, i) => (
                    <option key={i} value={i}>
                      {m}
                    </option>
                  ))}
                </select>

                <label className="text-sm font-semibold">To:</label>
                <select
                  value={monthRange[1]}
                  onChange={(e) => {
                    const newEnd = Math.max(
                      Number(e.target.value),
                      monthRange[0]
                    );
                    setMonthRange([monthRange[0], newEnd]);
                  }}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  {allMonths.map((m, i) => (
                    <option key={i} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" />
                <YAxis domain={[0, 1000]} />
                <Tooltip />
                <Legend verticalAlign="bottom" />

                {(userFilter === "both" || userFilter === "total") && (
                  <Line
                    type="monotone"
                    dataKey="Total Users"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                )}

                {(userFilter === "both" || userFilter === "active") && (
                  <Line
                    type="monotone"
                    dataKey="Active Users"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center text-2xl font-bold mb-4">
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
                  label={renderPieLabel}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center text-xl font-bold mb-2">
            <BarChartIcon className="text-blue-600 mr-2" />
            Species Detection Over Time
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={speciesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="SpeciesDetected"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

// StatCard component
function StatCard({
  label,
  value,
  note,
  icon,
  bgColor,
}: {
  label: string;
  value: string;
  note?: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className={`rounded-xl shadow p-8 flex items-center gap-7 ${bgColor}`}>
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-3xl shadow-md">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{label}</div>
        <div className="text-2xl font-extrabold mt-2 mb-1 text-white">
          {value}
        </div>
        {note && <div className="text-xs text-white/90">{note}</div>}
      </div>
    </div>
  );
}
