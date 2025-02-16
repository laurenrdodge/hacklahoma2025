"use client";

import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import jobs from "@/data/jobs.json";
import Link from "next/link";

export default function JobDetailPage() {
  const { id } = useParams() as { id: string };
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-8 pb-8 font-sans">
      <header>
        <div className="flex justify-between items-center py-6">
          <span>
            <span className="font-semibold text-xl text-gray-950">ether</span>
            <span className="font-black uppercase text-lg text-indigo-500">
              jobs
            </span>
          </span>
          <button className="px-3 py-2 text-xs font-medium text-white rounded-lg bg-gray-800 hover:bg-gray-700">
            Post a job
          </button>
        </div>
      </header>
      <div className="relative grid grid-cols-[30rem_minmax(0,1fr)] items-start max-h-content">
        <div className="sticky top-8 border border-gray-200 border-r-0 px-8 pt-8 pb-12 rounded-l-xl">
          <Link href={`/`} className="flex items-center mb-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-gray-500 text-sm inline-block">Back</span>
          </Link>
          <p className="font-semibold text-indigo-500 text-lg mb-2">
            {job.company}
          </p>
          <h1 className="text-5xl font-bold mb-2 tracking-tighter">
            {job.title}
          </h1>

          <div className="flex items-center space-x-2 mb-2 mt-5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5.37 2.257a1.25 1.25 0 0 1 1.214-.054l3.378 1.69 2.133-1.313A1.25 1.25 0 0 1 14 3.644v7.326c0 .434-.225.837-.595 1.065l-2.775 1.708a1.25 1.25 0 0 1-1.214.053l-3.378-1.689-2.133 1.313A1.25 1.25 0 0 1 2 12.354V5.029c0-.434.225-.837.595-1.064L5.37 2.257ZM6 4a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 6 4Zm4.75 2.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-gray-500">{job.location}</p>
            <span className="text-gray-600">&bull;</span>
            <p className="text-gray-500">{job.type}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z"
                clipRule="evenodd"
              />
              <path d="M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z" />
            </svg>

            <p className="text-gray-500">{job.salaryRange}</p>
          </div>

          <a
            href={`/job/${job.id}/apply`}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-8 block text-center text-sm font-medium hover:bg-gray-700"
          >
            Apply Now
          </a>
        </div>
        <div className="px-8 py-8 border border-gray-200 rounded-b-xl rounded-tr-xl">
          <div className="prose max-w-none">
            <ReactMarkdown>{job.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
