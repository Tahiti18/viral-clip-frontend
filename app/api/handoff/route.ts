import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function GET() {
  const zip = new JSZip();
  // Minimal content so build passes; replace with your real artifacts later.
  zip.file("captions.srt", "1\n00:00:00,000 --> 00:00:02,000\nHello!\n");
  const bytes = await zip.generateAsync({ type: "uint8array" });

  // Wrap the Uint8Array in a Buffer so NextResponse accepts BodyInit
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=handoff.zip"
    },
  });
}
