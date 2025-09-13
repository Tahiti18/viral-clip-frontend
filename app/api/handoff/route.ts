
import JSZip from "jszip";
import { NextResponse } from "next/server";
export async function GET(){
  const zip = new JSZip();
  zip.file("README.txt","Editor handoff kit");
  zip.file("captions.srt","1\n00:00:00,000 --> 00:00:02,000\nHello\n\n");
  const bytes = await zip.generateAsync({type:"uint8array"});
  return new NextResponse(bytes, { headers: { "Content-Type":"application/zip", "Content-Disposition":"attachment; filename=handoff.zip" } });
}
