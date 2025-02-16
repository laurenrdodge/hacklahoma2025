"use client";

import { useState } from "react";
import jobs from "@/data/jobs.json";
import JobCard from "@/components/JobCard";

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
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  // Mock new job to be inserted dynamically
  const newJob = {
    id: jobs.length + 1,
    title: jobTitle || "Job Title",
    company: companyName || "Company Name",
    location: location || "Location",
    type: jobType,
    salaryRange: salaryRange || "Salary Range",
    description,
    postedDate: new Date().toISOString().split("T")[0], // Today's date
  };

  // Combine jobs with live preview (sorted by dateAdded, newest first)
  const sortedJobs = [newJob, ...jobs].sort(
    (a, b) =>
      new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl flex overflow-hidden items-center">
        {/* Left: Job Input Form */}
        <div className="w-2/5 p-8">
          <h2 className="text-3xl font-bold mb-14 tracking-tight">
            Post a Job
          </h2>

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
            Description
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            placeholder="Markdown description, single-line"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          {/* Buttons */}
          <button className="w-full p-2 mt-8 bg-gray-800 hover:bg-gray-700 text-white rounded-md font-medium cursor-pointer">
            Post Job
          </button>
          <button
            onClick={onClose}
            className="w-full mt-4 p-2 border border-gray-200 hover:bg-gray-200 rounded-md font-medium text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Right: Job Listings with Live Preview */}
        <div className="w-3/5 bg-gray-50 p-6 overflow-y-auto h-[80vh]">
          <ul className="divide-y divide-gray-200">
            {sortedJobs.map((job, index) => (
              <li
                key={job.id}
                className={`py-4 ${
                  index === 1
                    ? "bg-white border border-gray-200 shadow-lg p-4 rounded-xl"
                    : "opacity-50 px-4"
                }`}
              >
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
