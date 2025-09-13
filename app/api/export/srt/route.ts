
import { NextResponse } from "next/server";
import { toSrt } from "@/lib/edl/captions";
export async function GET(){
  const srt = toSrt([ {start:0,end:2.5,text:"Hello world"}, {start:2.5,end:5,text:"This is a caption"} ]);
  return new NextResponse(srt,{ headers:{ "Content-Type":"text/plain; charset=utf-8", "Content-Disposition":"attachment; filename=subtitles.srt" }});
}
