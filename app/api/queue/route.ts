import { NextResponse } from "next/server";
export async function GET() {
  const base = process.env.NEXT_PUBLIC_API_BASE!;
  try { const r = await fetch(`${base}/v1/jobs/queue`, { cache: "no-store" }); const j = await r.json(); return NextResponse.json(j); }
  catch { return NextResponse.json({ error: "queue_unavailable" }, { status: 502 }); }
}
