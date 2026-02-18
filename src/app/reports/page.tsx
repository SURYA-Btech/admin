"use client";
import Navbar from "../components/Navbar";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BarChartIcon from "@mui/icons-material/BarChart";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState, ReactNode } from "react";

interface ReportTag {
  text: string;
  color: string;
}

interface Report {
  icon: ReactNode;
  title: string;
  tags: ReportTag[];
  desc: string;
  last: string;
  schedule: string;
  format: string;
  btn: string;
}

export default function ReportsAnalyticsPage() {
  const generateBtnColor = "bg-sky-600 hover:bg-sky-700";

  const [reports] = useState<Report[]>([
    {
      icon: <BarChartIcon fontSize="medium" className="text-gray-400" />,
      title: "Monthly User Activity Report",
      tags: [
        { text: "usage", color: "bg-blue-100 text-blue-600" },
        { text: "ready", color: "bg-green-100 text-green-600" },
      ],
      desc: "Comprehensive overview of user engagement and platform usage statistics",
      last: "2024-09-01",
      schedule: "monthly",
      format: "PDF",
      btn: "Generate",
    },
    {
      icon: <InsertChartIcon fontSize="medium" className="text-gray-400" />,
      title: "Dataset Usage Analytics",
      tags: [
        { text: "analytics", color: "bg-orange-100 text-orange-600" },
        { text: "ready", color: "bg-green-100 text-green-600" },
      ],
      desc: "Analysis of dataset downloads, most popular datasets, and access patterns",
      last: "2024-09-25",
      schedule: "weekly",
      format: "Excel",
      btn: "Generate",
    },
    {
      icon: <AssessmentIcon fontSize="medium" className="text-gray-400" />,
      title: "Security Audit Report",
      tags: [
        { text: "security", color: "bg-red-100 text-red-500" },
        { text: "ready", color: "bg-green-100 text-green-600" },
      ],
      desc: "Security events, failed login attempts, and access violations summary",
      last: "2024-09-20",
      schedule: "weekly",
      format: "PDF",
      btn: "Generate",
    },
    {
      icon: <InsertDriveFileIcon fontSize="medium" className="text-gray-400" />,
      title: "GDPR Compliance Report",
      tags: [
        { text: "compliance", color: "bg-yellow-100 text-yellow-700" },
        { text: "scheduled", color: "bg-blue-100 text-blue-600" },
      ],
      desc: "Data processing activities and compliance with research data regulations",
      last: "2024-08-30",
      schedule: "monthly",
      format: "PDF",
      btn: "Generate",
    },
    {
      icon: <AutoGraphIcon fontSize="medium" className="text-gray-400" />,
      title: "Species Detection Summary",
      tags: [
        { text: "custom", color: "bg-green-100 text-green-600" },
        { text: "generating", color: "bg-yellow-100 text-yellow-700" },
      ],
      desc: "Detailed analysis of marine species detected across all eDNA datasets",
      last: "2024-09-22",
      schedule: "manual",
      format: "CSV",
      btn: "Generating...",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#f7fafd]">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-auto">
        {/* Page title */}
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold text-sky-700">
            Reports &amp; Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Generate comprehensive reports and insights from your marine research platform data
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard
            label="Total Reports"
            value={reports.length}
            icon={<DescriptionIcon className="text-white" />}
            bgColor="bg-blue-500"
          />
          <StatCard
            label="Ready"
            value={3} // Changed from string to number to match interface
            icon={<DownloadIcon className="text-teal-600" />}
            bgColor="bg-green-100"
            textColor="text-teal-700"
          />
          <StatCard
            label="Generating"
            value={1} // Changed from string to number to match interface
            icon={<ScheduleIcon className="text-yellow-600" />}
            bgColor="bg-yellow-100"
            textColor="text-yellow-700"
          />
          <StatCard
            label="Scheduled"
            value={1} // Changed from string to number to match interface
            icon={<ScheduleIcon className="text-blue-500" />}
            bgColor="bg-blue-100"
            textColor="text-blue-700"
          />
        </div>

        {/* Quick Report Buttons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Report Generation</h2>
          <div className="grid grid-cols-3 gap-6 bg-sky-50 p-4 rounded-lg">
            <QuickButton
              color="bg-gray-100"
              icon={<BarChartIcon fontSize="medium" className="mr-2 text-gray-700" />}
              label="User Activity"
            />
            <QuickButton
              color="bg-gray-100"
              icon={<InsertChartIcon fontSize="medium" className="mr-2 text-gray-700" />}
              label="Dataset Usage"
            />
            <QuickButton
              color="bg-gray-100"
              icon={<AutoGraphIcon fontSize="medium" className="mr-2 text-gray-700" />}
              label="Platform Analytics"
            />
          </div>

        </div>

        {/* Reports Table */}
        <div className="bg-white shadow rounded-2xl p-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <DescriptionIcon className="text-blue-500" /> Available Reports
            </h2>
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm outline-none focus:ring-2">
                <option>All Types</option>
                <option>Usage</option>
                <option>Analytics</option>
                <option>Security</option>
                <option>Compliance</option>
              </select>
              <button className={`${generateBtnColor} text-white px-6 py-2 rounded-lg font-semibold shadow transition`}>
                New Report
              </button>
            </div>
          </div>

          {/* Report list */}
          <div className="flex flex-col space-y-5">
            {reports.map((r, idx) => (
              <ReportRow key={idx} report={r} generateBtnColor={generateBtnColor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickButtonProps {
  color: string;
  icon: ReactNode;
  label: string;
}

// Quick Button
function QuickButton({ color, icon, label }: QuickButtonProps) {
  return (
    <button
      className={`rounded-xl shadow-md h-20 text-lg font-bold flex-1 flex items-center justify-center ${color} text-gray-700 hover:bg-gray-200 transition`}
    >
      {icon} {label}
    </button>
  );
}

interface ReportRowProps {
  report: Report;
  generateBtnColor: string;
}

// Report Row
function ReportRow({ report, generateBtnColor }: ReportRowProps) {
  return (
    <div className="flex items-center bg-gray-50 rounded-xl p-5 shadow-sm hover:border-blue-200 transition border border-transparent">
      <div className="mr-6">{report.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-semibold text-gray-900">{report.title}</span>
          {report.tags.map((t, i) => (
            <span key={i} className={`text-xs font-semibold rounded-full px-3 py-0.5 ${t.color}`}>
              {t.text}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">{report.desc}</div>
        <div className="flex gap-4 mt-2 text-xs text-gray-400">
          <span><ScheduleIcon fontSize="inherit" className="mr-1" /> Last: {report.last}</span>
          <span><ScheduleIcon fontSize="inherit" className="mr-1" /> Schedule: {report.schedule}</span>
          <span><FileCopyIcon fontSize="inherit" className="mr-1" /> Format: {report.format}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-3">
        <ActionBtn icon={<DownloadIcon />} color="text-sky-600 hover:bg-blue-50" title="Download" />
        <ActionBtn icon={<VisibilityIcon />} color="text-gray-600 hover:bg-gray-100" title="View" />
        <ActionBtn icon={<ShareIcon />} color="text-gray-600 hover:bg-gray-100" title="Share" />
        <ActionBtn icon={<EmailIcon />} color="text-gray-600 hover:bg-gray-100" title="Mail" />
      </div>
      <button
        className={`ml-4 px-6 py-2 rounded-lg font-semibold shadow ${generateBtnColor} text-white hover:brightness-105 transition`}
        disabled={report.btn.includes("Generating")}
      >
        {report.btn}
      </button>
    </div>
  );
}

interface ActionBtnProps {
  icon: ReactNode;
  color: string;
  title: string;
}

// Action button
function ActionBtn({ icon, color, title }: ActionBtnProps) {
  return (
    <button className={`${color} rounded-full p-2 transition`} title={title}>
      {icon}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  bgColor: string;
  textColor?: string;
}

// Stat Card
function StatCard({ label, value, icon, bgColor, textColor }: StatCardProps) {
  return (
    <div className="rounded-xl shadow bg-white p-6 flex items-center gap-6 border border-slate-200">
      {/* Icon circle with color */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${bgColor} ${textColor || "text-white"}`}>
        {icon}
      </div>
      {/* Texts */}
      <div>
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="text-2xl font-extrabold text-slate-800">{value}</div>
      </div>
    </div>
  );
}
