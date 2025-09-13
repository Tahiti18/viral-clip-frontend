import { NextResponse } from "next/server";
import { generatePremiereXml } from "@/lib/edl/generatePremiereXml";

export async function GET() {
  const xml = generatePremiereXml("ViralClip", [
    { id: "a", start: 0, end: 5, text: "Intro" },
    { id: "b", start: 5, end: 12, text: "Body" }
  ]);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": "attachment; filename=premiere.xml"
    }
  });
}
