"use client";
import { useState } from "react";
import QueueWidget from "@/components/QueueWidget";
import JobStreamPanel from "@/components/JobStreamPanel";
export default function AppPage() {
  const [jobId, setJobId] = useState("");
  return (<main className="py-10"><div className="mx-auto max-w-6xl px-5 grid gap-4 md:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-card p-4 md:col-span-1"><h2 className="font-semibold">Queue</h2><QueueWidget /></div>
    <div className="rounded-xl border border-white/10 bg-card p-4 md:col-span-2"><h2 className="font-semibold">Job Stream</h2>
      <div className="mt-2 flex gap-2"><input value={jobId} onChange={e=>setJobId(e.target.value)} placeholder="job UUID" className="w-full rounded-lg border border-white/10 bg-card2 px-3 py-2" /></div>
      <div className="mt-3"><JobStreamPanel jobId={jobId} /></div>
    </div>
  </div></main>);
}
