"use client";

export const runtime = "edge";

import { useState } from "react";
import JobBoard from "@/components/JobBoard";
import JobPostModal from "@/components/JobPostModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <main className="max-w-4xl mx-auto px-4 font-sans pb-16">
      <header>
        <div className="flex justify-between items-center py-6">
          <span>
            <span className="font-semibold text-xl text-gray-950">ether</span>
            <span className="font-black uppercase text-lg text-indigo-500">
              jobs
            </span>
          </span>
          <button
            className="px-3 py-2 text-sm font-medium text-white rounded-lg bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsModalOpen(true)}
          >
            Post a job
          </button>
        </div>
        <div className="pt-8 pb-12">
          <h1 className="text-5xl text-center font-bold tracking-tighter">
            Decentralized hiring, verified <br />
            opportunities. Get hired faster than ever.
          </h1>
          <p className="mt-6 text-center text-lg text-gray-500 max-w-[48rem] mx-auto">
            A job board where companies stake their reputation &ndash;
            literally. No fake listings. No misleading posts. Just real jobs
            from verified employers.
          </p>
          <div className="mx-auto space-x-4 text-center mt-8">
            <a
              href="#jobs"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gray-800 border border-gray-800 hover:bg-gray-700"
            >
              View jobs
            </a>
            <a className="px-4 py-2 text-sm font-semibold text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-200">
              Learn more
            </a>
          </div>
        </div>
      </header>
      <JobBoard />
      <JobPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
