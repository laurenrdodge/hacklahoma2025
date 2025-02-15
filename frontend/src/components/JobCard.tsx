import Link from "next/link";
import { FC } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  description: string;
};

interface JobCardProps {
  job: Job;
}

const JobCard: FC<JobCardProps> = ({ job }) => {
  return (
    <div className="relative flex justify-between items-center rounded-xl">
      <div className="flex items-center">
        <div className="h-16 w-16 bg-indigo-500 rounded-full"></div>
        <div className="ml-4">
          <h2 className="font-medium text-sm text-gray-700">{job.company}</h2>
          <h3 className="font-semibold text-lg tracking-tight text-gray-950">
            {job.title}
          </h3>
          <div className="flex space-x-2 text-gray-400">
            <p>{job.type}</p>
            <span className="text-gray-500">&bull;</span>
            <p className="">{job.salaryRange}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-6">
        <p className="text-gray-600">{job.location}</p>
        <p className="text-gray-400">2d ago</p>
      </div>
    </div>
  );
};

export default JobCard;
