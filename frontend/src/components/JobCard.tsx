// import a from "next/a";
import { FC } from "react";
import Image from "next/image";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  description: string;
  image?: string;
  postedDate: string | null;
  employerResponseTime: string | null;
  rating: number;
};

interface JobCardProps {
  job: Job;
}

// Function to calculate "time ago"
const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - postedDate.getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInWeek = secondsInDay * 7;
  const secondsInMonth = secondsInDay * 30;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < secondsInDay) return "Today";
  if (diffInSeconds < secondsInWeek)
    return `${Math.floor(diffInSeconds / secondsInDay)}d ago`;
  if (diffInSeconds < secondsInMonth)
    return `${Math.floor(diffInSeconds / secondsInWeek)}w ago`;
  if (diffInSeconds < secondsInYear)
    return `${Math.floor(diffInSeconds / secondsInMonth)}mo ago`;
  return `${Math.floor(diffInSeconds / secondsInYear)}y ago`;
};

const JobCard: FC<JobCardProps> = ({ job }) => {
  const hasImage = job.image && job.image.trim() !== "";

  return (
    <a
      href={`/job/${job.id}`}
      className="relative flex justify-between items-center rounded-xl cursor-pointer"
    >
      <div className="flex items-center">
        {job.rating < 2 ? (
          <div className="size-2 rounded-full bg-emerald-500"></div>
        ) : job.rating < 4 ? (
          <div className="size-2 rounded-full bg-yellow-400"></div>
        ) : (
          <div className="size-2 rounded-full bg-red-500"></div>
        )}
        {hasImage ? (
          <Image
            src={job.image as string}
            alt={job.company}
            width={64}
            height={64}
            className="rounded-full ml-4 border border-gray-200"
          />
        ) : (
          <div className="h-16 w-16 bg-indigo-500 rounded-full border border-gray-200"></div>
        )}
        <div className="ml-4">
          <h2 className="flex items-center space-x-1 font-medium text-sm text-gray-700">
            <span>{job.company}</span>
          </h2>
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
      <div className="flex items-center space-x-6">
        <p className="text-gray-600">{job.location}</p>
        <p className="text-gray-400 w-18 text-right">
          {job.postedDate ? getTimeAgo(job.postedDate) : "N/A"}
        </p>
      </div>
    </a>
  );
};

export default JobCard;
