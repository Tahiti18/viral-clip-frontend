import { NextResponse } from "next/server";
import JSZip from "jszip";
import { toSrt, sampleCaptions } from "@/lib/edl/captions";

/**
 * Returns a ZIP with:
 *  - README.txt
 *  - captions.srt (generated from sampleCaptions)
 *
 * We return an ArrayBuffer to satisfy BodyInit under strict TS config.
 */
export async function GET() {
  const zip = new JSZip();
  const srt = toSrt(sampleCaptions());
  zip.file("README.txt", "UnityLab editor handoff");
  zip.file("captions.srt", srt);

  const bytes = await zip.generateAsync({ type: "uint8array" });

  // Ensure we pass an ArrayBuffer of the exact view range:
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

  return new NextResponse(ab, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="handoff.zip"',
      "Cache-Control": "no-store"
    }
  });
}
