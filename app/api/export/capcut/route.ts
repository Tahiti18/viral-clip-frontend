import { NextRequest } from "next/server"; import { generateCapcutJson_TEMPORARY } from "@/lib/edl/generateCapcutJson"; import { Timeline } from "@/lib/edl/types";
export async function POST(req: NextRequest){ const tl = await req.json() as Timeline; const json = generateCapcutJson_TEMPORARY(tl);
  return new Response(json, { headers: { "Content-Type":"application/json; charset=utf-8", "Content-Disposition": `attachment; filename="${tl.title.replace(/\W+/g,'_')}.capcut.json"` } }); }
