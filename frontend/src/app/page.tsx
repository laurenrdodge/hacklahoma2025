import JobCard from "@/components/JobCard";
import jobs from "@/data/jobs.json";

export default function Home() {
  return (
    <main className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-bold tracking-tighter">Job Board</h1>
      <ul className="mt-4 divide-y divide-gray-200">
        {jobs.map((job) => (
          <li key={job.id} className="group relative py-6 sm:rounded-2xl">
            <div className="absolute -inset-x-4 -inset-y-px bg-gray-50 opacity-0 group-hover:opacity-100 sm:-inset-x-5 sm:rounded-2xl lg:-inset-x-8"></div>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </main>
  );
}
