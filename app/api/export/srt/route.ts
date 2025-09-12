import { NextRequest } from "next/server"; import { Timeline } from "@/lib/edl/types"; import { captionsToSrt } from "@/lib/edl/captions";
export async function POST(req: NextRequest){ const tl = await req.json() as Timeline; const srt = captionsToSrt(tl.captions || []);
  return new Response(srt, { headers: { "Content-Type":"application/x-subrip; charset=utf-8", "Content-Disposition": `attachment; filename="${tl.title.replace(/\W+/g,'_')}.srt"` } }); }
