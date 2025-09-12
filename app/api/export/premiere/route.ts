import { NextRequest } from "next/server"; import { generatePremiereXml } from "@/lib/edl/generatePremiereXml"; import { Timeline } from "@/lib/edl/types";
export async function POST(req: NextRequest){ const tl = await req.json() as Timeline; const xml = generatePremiereXml(tl);
  return new Response(xml, { headers: { "Content-Type":"application/xml; charset=utf-8", "Content-Disposition": `attachment; filename="${tl.title.replace(/\W+/g,'_')}.xml"` } }); }
