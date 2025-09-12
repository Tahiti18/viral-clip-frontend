import { NextRequest } from "next/server"; import { generateFcpxml } from "@/lib/edl/generateFcpxml"; import { Timeline } from "@/lib/edl/types";
export async function POST(req: NextRequest){ const body = await req.json() as (Timeline & { embedTitles?: boolean }); const { embedTitles=false, ...rest } = body;
  const xml = generateFcpxml(rest, { embedTitles });
  return new Response(xml, { headers: { "Content-Type":"application/xml; charset=utf-8", "Content-Disposition": `attachment; filename="${rest.title.replace(/\W+/g,'_')}.fcpxml"` } }); }
