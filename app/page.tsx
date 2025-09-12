import Link from "next/link";
import QueueWidget from "@/components/QueueWidget";
export default function Page() {
  return (<main>
    <section className="border-b border-white/10 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <span className="inline-block text-xs text-zinc-300 border border-white/10 rounded-full px-2 py-1">New · SLA’s you can see</span>
        <h1 className="mt-3 text-4xl font-bold leading-tight">From one long video to 10 high-performing clips — with <span className="text-emerald-400">live SLAs</span>, A/B hooks, and brand compliance.</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">Repurpose, test, and publish short-form — with queue transparency and promotion logic built in.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-lg bg-gradient-to-r from-brand to-brand2 px-4 py-2" href="/app">Start free</Link>
          <a className="rounded-lg border border-white/10 px-4 py-2" href="#queue">See live queue</a>
          <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">No trackers. No geo-locks.</span>
        </div>
      </div>
    </section>
    <section id="features" className="border-b border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-card p-4"><h3 className="text-lg font-semibold">Live queue & SLAs</h3><p className="text-zinc-400">ETAs by lane.</p><div id="queue" className="mt-3"><QueueWidget /></div></div>
        <div className="rounded-xl border border-white/10 bg-card p-4"><h3 className="text-lg font-semibold">A/B hooks & captions</h3><p className="text-zinc-400">Auto-promote winners.</p><pre className="mt-3 text-xs text-zinc-300 border border-white/10 rounded-lg p-3 bg-card">POST /v1/ab/experiments → /metrics → /decide</pre></div>
        <div className="rounded-xl border border-white/10 bg-card p-4"><h3 className="text-lg font-semibold">Brand & compliance</h3><p className="text-zinc-400">Catch do-not-say before you post.</p></div>
      </div>
    </section>
  </main>);
}
