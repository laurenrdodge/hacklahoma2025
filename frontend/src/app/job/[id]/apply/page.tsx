"use client";

export const runtime = "edge";

import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import jobs from "@/data/jobs.json";
import Link from "next/link";
import Image from "next/image";
import JobPostModal from "@/components/JobPostModal";

export default function JobApplyPage() {
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const { id } = useParams() as { id: string };
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeText, setResumeText] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(`Submitted Application:
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Date of Birth: ${dob}
Phone: ${phone}
Address: ${address}
LinkedIn: ${linkedin}
Cover Letter: ${coverLetter}
Resume: ${resumeText}`);
  }

  return (
    <main className="max-w-6xl mx-auto px-8 pb-16 font-sans">
      <header>
        <div className="flex justify-between items-center py-6">
          <a href={`/job/${job.id}`}>
            <span className="font-semibold text-3xl text-gray-950">ether</span>
            <span className="font-black uppercase text-2xl text-indigo-500">
              jobs
            </span>
          </a>
          <button
            className="px-3 py-2 text-sm font-medium text-white rounded-lg bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsJobModalOpen(true)}
          >
            Post a job
          </button>
        </div>
      </header>
      <div className="relative grid grid-cols-[30rem_minmax(0,1fr)] items-start max-h-content">
        <div className="sticky top-8 border border-gray-200 border-r-0 px-8 pt-8 pb-10 rounded-l-xl">
          <a
            href={`/job/${job.id}`}
            className="inline-flex group items-center mb-6 text-gray-400 hover:bg-gray-100 hover:text-gray-500 py-1 pl-1 pr-2 rounded-lg -ml-1"
          >
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

            <span className="text-gray-500 text-sm inline-block group-hover:text-gray-600">
              Back
            </span>
          </a>
          <div className="flex items-center space-x-2 mb-6">
            <Image
              src={job.image as string}
              alt={job.company}
              width={36}
              height={36}
              className="rounded-full border border-gray-200"
            />
            <p className="font-semibold text-indigo-500 text-lg">
              {job.company}
            </p>
          </div>
          <h1 className="text-5xl font-semibold mb-2 tracking-tighter">
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

          {/* {job.employerResponseTime ? (
            <p className="text-gray-500 text-center mt-6">
              Usually responds within {job.employerResponseTime}.
            </p>
          ) : null} */}
        </div>
        <div className="px-8 py-8 border border-gray-200 rounded-b-xl rounded-tr-xl">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">
            Apply for this role
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LinkedIn Profile
              </label>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write a brief cover letter..."
              />
            </div>

            <div>
              <label
                htmlFor="resumeText"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Resume or Additional Info
              </label>
              <textarea
                id="resumeText"
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste your resume or additional information..."
              />
            </div>

            <button
              type="submit"
              className="bg-gray-800 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-700 w-full"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
      <JobPostModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
    </main>
  );
}
