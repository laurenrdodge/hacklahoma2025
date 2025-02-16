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
  const [description, setDescription] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<{ rating: number; feedback: string }>({ rating: 0, feedback: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobPosting = `
        ${jobTitle}
        ${companyName}
        ${location}
        ${salaryRange}
        ${description}
      `;

      // Call the server-side API route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobPosting }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.error || 'Error analyzing job posting asf.');
        return;
      }

      setAiAnalysis({ rating: data.rating, feedback: data.feedback });

      // Check if the job posting is deemed misleading
      if (data.rating >= 4) {
        alert("Job posting deemed misleading. Please revise.");
        return;
      }

      // Here you would typically send the job post to your backend
      alert("Job posting submitted successfully!");
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert("Error analyzing job posting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        {/* Left: Job Input Form */}
        <div className="w-2/5 p-6">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Post a Job</h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-3"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-3"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-3"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
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
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-md mb-3"
              placeholder="Markdown description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              className="w-full p-2 border rounded-md mb-3"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            {/* AI Analysis Display */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">AI Analysis</h3>
              <div className={`p-3 rounded-md ${aiAnalysis.rating >= 3 ? "bg-red-50" : "bg-green-50"}`}>
                <p className="text-sm">
                  Rating: {aiAnalysis.rating} / 5<br />
                  Feedback: {aiAnalysis.feedback}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md font-medium cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Post Job"}
              </button>
              <button
                onClick={onClose}
                className="w-full mt-4 p-2 border border-gray-200 hover:bg-gray-200 rounded-md font-medium text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Preview */}
        <div className="w-3/5 bg-gray-50 p-6 flex flex-col justify-center">
          <div className="border p-4 rounded-lg bg-white">
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
