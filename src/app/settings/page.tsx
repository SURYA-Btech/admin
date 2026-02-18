"use client";
import Navbar from "../components/Navbar";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

type SectionType = "general" | "security" | "email" | "data" | "integrations" | "notifications";

export default function PlatformSettingsPage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [notifications, setNotifications] = useState({
    system: true,
    security: true,
    upload: true,
    analysis: true,
  });

  const [savedSections, setSavedSections] = useState<Record<SectionType, boolean>>({
    general: false,
    security: false,
    email: false,
    data: false,
    integrations: false,
    notifications: false,
  });

  function saveSection(section: SectionType) {
    setSavedSections((prev) => ({ ...prev, [section]: true }));
    setTimeout(() => {
      setSavedSections((prev) => ({ ...prev, [section]: false }));
    }, 2000);
  }

  return (
    <div className="flex min-h-screen bg-[#f7fafd]">
      <div className="sticky top-0 h-screen">
        <Navbar />
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <h3 className="text-3xl font-extrabold text-sky-700 mb-1">Configure settings, and system preferences</h3>


        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <InfoIcon className="text-blue-400" /> General Settings
          </legend>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Platform Name</label>
              <input
                defaultValue="MarineAdmin Research Platform"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Timezone</label>
              <select
                defaultValue="Eastern Time"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option>Eastern Time</option>
                <option>Central Time</option>
                <option>Pacific Time</option>
                <option>Universal Time (UTC)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[15px] font-semibold mb-1 text-gray-900">Platform Description</label>
            <textarea
              rows={2}
              defaultValue="Advanced marine research data management system"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none resize-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <SectionSave saved={savedSections.general} onClick={() => saveSection("general")} />
        </fieldset>

        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <SecurityIcon className="text-blue-400" /> Security Settings
          </legend>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Session Timeout (hours)</label>
              <input
                type="number"
                min={1}
                defaultValue={8}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Max Login Attempts</label>
              <input
                type="number"
                min={1}
                defaultValue={5}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex-1">
              <div className="font-semibold text-[15px] text-gray-900">Two-Factor Authentication</div>
              <div className="text-gray-700 text-sm">Require 2FA for all admin accounts</div>
            </div>
            <TwoFactorToggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
          </div>
          <SectionSave saved={savedSections.security} onClick={() => saveSection("security")} />
        </fieldset>

        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <EmailIcon className="text-blue-400" /> Email Configuration
          </legend>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">SMTP Host</label>
              <input
                defaultValue="smtp.marinelab.org"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">SMTP Port</label>
              <input
                defaultValue="587"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Email Username</label>
              <input
                defaultValue="admin@marinelab.org"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Email Password</label>
              <input
                type="password"
                defaultValue="********"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>
          <SectionSave saved={savedSections.email} onClick={() => saveSection("email")} />
        </fieldset>

        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <StorageIcon className="text-blue-400" /> Data Management
          </legend>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Max Upload Size (GB)</label>
              <input
                defaultValue="50"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Data Retention (years)</label>
              <input
                defaultValue="7"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
            <div>
              <label className="block text-[15px] font-semibold mb-1 text-gray-900">Backup Frequency</label>
              <select
                defaultValue="Daily"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          <SectionSave saved={savedSections.data} onClick={() => saveSection("data")} />
        </fieldset>

        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <IntegrationInstructionsIcon className="text-blue-400" /> External Integrations
          </legend>
          <div className="mb-4">
            <label className="block text-[15px] font-semibold mb-1 text-gray-900">Zapier Webhook URL</label>
            <div className="flex gap-2">
              <input
                defaultValue="https://hooks.zapier.com/hooks/catch/..."
                className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <button className="rounded-lg px-4 py-2 bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">
                Test
              </button>
            </div>
            <div className="text-xs text-gray-700 mt-1">
              Connect with Zapier to automate workflows and notifications
            </div>
          </div>
          <div>
            <label className="block text-[15px] font-semibold mb-1 text-gray-900">API Rate Limit (requests/hour)</label>
            <input
              defaultValue="1000"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <SectionSave saved={savedSections.integrations} onClick={() => saveSection("integrations")} />
        </fieldset>

        <fieldset className="bg-white shadow rounded-2xl p-7 mb-6 border border-gray-200">
          <legend className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
            <NotificationsActiveIcon className="text-blue-400" /> Notification Preferences
          </legend>
          <div className="flex flex-col gap-2">
            <NotificationRow
              label="System Alerts"
              desc="Receive alerts for system issues"
              checked={notifications.system}
              onChange={(v) => setNotifications((n) => ({ ...n, system: v }))}
            />
            <NotificationRow
              label="Security Alerts"
              desc="Receive security-related notifications"
              checked={notifications.security}
              onChange={(v) => setNotifications((n) => ({ ...n, security: v }))}
            />
            <NotificationRow
              label="Data Upload Alerts"
              desc="Get notified when new datasets are uploaded"
              checked={notifications.upload}
              onChange={(v) => setNotifications((n) => ({ ...n, upload: v }))}
            />
            <NotificationRow
              label="Analysis Complete Alerts"
              desc="Receive notifications when analyses finish"
              checked={notifications.analysis}
              onChange={(v) => setNotifications((n) => ({ ...n, analysis: v }))}
            />
          </div>
          <SectionSave saved={savedSections.notifications} onClick={() => saveSection("notifications")} />
        </fieldset>

        <div className="flex items-center justify-between mt-6">
          <button className="bg-white px-5 py-2 rounded-lg font-semibold shadow border flex items-center gap-2 hover:bg-gray-100 transition">
            <StorageIcon className="text-blue-600" /> Export Settings
          </button>
          <button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-8 py-3 rounded-lg font-semibold shadow hover:from-sky-600 hover:to-cyan-600 transition flex gap-2 items-center">
            <InfoIcon />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}

interface SectionSaveProps {
  saved: boolean;
  onClick: () => void;
}

function SectionSave({ saved, onClick }: SectionSaveProps) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={onClick}
        className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition shadow-lg"
        title="Save"
      >
        <CheckIcon />
      </button>
      {saved && <span className="text-blue-600 font-semibold">Saved!</span>}
    </div>
  );
}

interface TwoFactorToggleProps {
  checked: boolean;
  onChange: () => void;
}

function TwoFactorToggle({ checked, onChange }: TwoFactorToggleProps) {
  return (
    <label className="inline-flex items-center ml-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative transition">
        <div
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""
            }`}
        ></div>
      </div>
    </label>
  );
}

interface NotificationRowProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function NotificationRow({ label, desc, checked, onChange }: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-semibold text-[15px] text-gray-900">{label}</div>
        <div className="text-sm text-gray-700">{desc}</div>
      </div>
      <label className="inline-flex items-center ml-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative transition">
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""
              }`}
          ></div>
        </div>
      </label>
    </div>
  );
}
