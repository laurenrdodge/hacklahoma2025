"use client";

import { useState } from "react";

interface JobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobPostModal({ isOpen, onClose }: JobPostModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobType, setJobType] = useState("Full-time");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        {/* Left: Job Input Form */}
        <div className="w-2/5 p-6">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Post a Job</h2>

          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            placeholder="$100,000 - $150,000"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            className="w-full p-2 border rounded-md mb-3"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 p-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Close
          </button>
        </div>

        {/* Right: Live Preview */}
        <div className="w-3/5 bg-gray-50 p-6 flex flex-col justify-center">
          {/* <h3 className="text-gray-500 mb-2">Preview</h3> */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <div className="relative flex justify-between items-center rounded-xl">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-indigo-500 rounded-full"></div>
                <div className="ml-4">
                  <h2 className="font-medium text-sm text-gray-700">
                    {companyName || "Company Name"}
                  </h2>
                  <h3 className="font-semibold text-lg tracking-tight text-gray-950">
                    {jobTitle || "Job Title"}
                  </h3>
                  <div className="flex space-x-2 text-gray-400">
                    <p>{jobType} </p>
                    <span className="text-gray-500">&bull;</span>
                    <p className="">{salaryRange || "Salary Range"}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6">
                <p className="text-gray-600">{location || "Location"}</p>
                <p className="text-gray-400">2d ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
