"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";
import jobs from "@/data/jobs.json";

export default function JobBoard() {
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState(0);

  const filteredJobs = jobs
    .filter(
      (job) =>
        (job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())) &&
        parseInt(
          job.salaryRange.split("-")[1].replace("$", "").replace(",", "")
        ) >=
          minSalary * 1000
    )
    .sort(
      (a, b) =>
        new Date(b.postedDate ?? "").getTime() -
        new Date(a.postedDate ?? "").getTime()
    );

  return (
    <div>
      <div className="border-b border-gray-200 mt-4">
        <div className="flex flex-col mb-3 md:flex-row gap-4 text-gray-500">
          {/* Search Bar */}
          <div className="w-full md:w-2/3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              placeholder="Search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-gray-700 w-full md:w-2/3 p-2 rounded-md focus:outline-none focus:text-gray-950"
            />
          </div>

          {/* Salary Filter */}
          <div className="w-full md:w-1/3">
            <p className="text-gray-500 mb-2">Minimum Salary: ${minSalary}k</p>
            <div className="relative">
              {/* Custom slider background */}
              <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
              {/* Filled slider portion */}
              <div
                className="absolute top-1/2 h-2 bg-indigo-500 rounded-full transform -translate-y-1/2"
                style={{ width: `${(minSalary / 200) * 100}%` }}
              ></div>
              {/* Input Slider */}
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full opacity-0 cursor-pointer absolute top-0 left-0 h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200 mb-8" id="jobs">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li key={job.id} className="group relative py-6">
              <div className="absolute -inset-x-4 -inset-y-px bg-gray-50 opacity-0 group-hover:opacity-100 sm:-inset-x-5 sm:rounded-2xl lg:-inset-x-8"></div>
              <JobCard job={job} />
            </li>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-500">No jobs found</p>
        )}
      </ul>
    </div>
  );
}
