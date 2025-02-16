"use client";

import JobCard from "@/components/JobCard";
import jobs from "@/data/jobs.json";

export default function JobBoard() {
  return (
    <div>
      <div className="border-b border-gray-200 mt-4"></div>
      <ul className="divide-y divide-gray-200 mb-8" id="jobs">
        {jobs.map((job) => (
          <li key={job.id} className="group relative py-6 sm:rounded-2xl">
            <div className="absolute -inset-x-4 -inset-y-px bg-gray-50 opacity-0 group-hover:opacity-100 sm:-inset-x-5 sm:rounded-2xl lg:-inset-x-8"></div>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </div>
  );
}
