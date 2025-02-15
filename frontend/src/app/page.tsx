import JobCard from "@/components/JobCard";
import jobs from "@/data/jobs.json";

export default function Home() {
  return (
    <main className="container mx-auto px-4 font-sans">
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
        <div className="pt-8 pb-12">
          <h1 className="text-4xl text-center font-bold tracking-tighter">
            Decentralized hiring, verified <br />
            opportunities. Get hired faster than ever.
          </h1>
          <p className="mt-6 text-center text-lg text-gray-500 max-w-[48rem] mx-auto">
            A job board where companies stake their reputation &ndash;
            literally. No fake listings. No misleading posts. Just real jobs
            from verified employers
          </p>
          <div className="mx-auto space-x-4 text-center mt-8">
            <button className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gray-800 border border-gray-800 hover:bg-gray-700">
              View jobs
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-200">
              Learn more
            </button>
          </div>
        </div>
      </header>
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
