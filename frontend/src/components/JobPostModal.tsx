"use client";

import { useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}
import jobs from "@/data/jobs.json";
import JobCard from "@/components/JobCard";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";

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
  const [stakeAmount, setStakeAmount] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<{
    rating: number;
    feedback: string;
  }>({ rating: 0, feedback: "" });
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
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobPosting }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.error || "Error analyzing job posting asf.");
        return;
      }

      setAiAnalysis({ rating: data.rating, feedback: data.feedback });

      // Check if the job posting is deemed misleading
      if (data.rating >= 4) {
        alert("Job posting deemed misleading. Please revise.");
        return;
      }

      if (!window.ethereum) {
        alert("Please install MetaMask or connect to Ethereum network.");
        return;
      }
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const jobBoardABI = [
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "_stakingToken",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "jobId",
              "type": "uint256"
            }
          ],
          "name": "InterviewConfirmed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "jobId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "employer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "flaggedAsMisleading",
              "type": "bool"
            }
          ],
          "name": "JobPosted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "jobId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "reporter",
              "type": "address"
            }
          ],
          "name": "JobReportedFake",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_jobId",
              "type": "uint256"
            }
          ],
          "name": "confirmInterview",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "jobIdCounter",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "jobListings",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "employer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "aiRating",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "stakeAmount",
              "type": "uint256"
            },
            {
              "internalType": "enum JobBoard.JobStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "flaggedAsMisleading",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "_aiRating",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "_stakeAmount",
              "type": "uint256"
            }
          ],
          "name": "postJob",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_jobId",
              "type": "uint256"
            }
          ],
          "name": "reportFakeJob",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "stakingToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

      const jobBoardAddress = process.env.NEXT_PUBLIC_JOB_BOARD_ADDRESS;
      if (!jobBoardAddress) {
        throw new Error("Job board address is not defined");
      }
      const jobBoardContract = new ethers.Contract(jobBoardAddress, jobBoardABI, signer as unknown as ethers.ContractRunner);

      // Convert stake amount to wei
      const parsedStakeAmount = parseEther(stakeAmount);

      // Post the job
      const tx = await jobBoardContract.postJob(
        jobTitle,
        description, // Assuming description combines all fields
        aiAnalysis.rating, // AI rating from analysis
        parsedStakeAmount
      );

      await tx.wait();

      alert("Job posted successfully!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Error posting job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    employerResponseTime: null, // or provide a default value
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
        <div className="w-2/5 p-8 h-[85vh] overflow-y-auto">
          <h2 className="text-3xl font-bold mb-14 tracking-tight">
            Post a Job
          </h2>

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
              Stake Amount (ETH)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md mb-3"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              required
              min="0.1"
              step="0.1"
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                AI Analysis
              </h3>
              <div
                className={`p-3 rounded-md ${aiAnalysis.rating >= 3 ? "bg-red-50" : "bg-green-50"
                  }`}
              >
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

        {/* Right: Job Listings with Live Preview */}
        <div className="w-3/5 bg-gray-50 p-6 overflow-y-auto h-[85vh]">
          <ul className="divide-y divide-gray-200">
            {sortedJobs.map((job, index) => (
              <li
                key={job.id}
                className={`py-4 ${index === 1
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
