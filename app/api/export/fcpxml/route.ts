import { NextResponse } from "next/server";
import { generateFcpxml } from "@/lib/edl/generateFcpxml";

export async function GET() {
  const xml = generateFcpxml("ViralClip", [
    { id: "a", start: 0, end: 5, text: "Intro" },
    { id: "b", start: 5, end: 12, text: "Body" }
  ]);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": "attachment; filename=fcpxml.xml"
    }
  });
}
