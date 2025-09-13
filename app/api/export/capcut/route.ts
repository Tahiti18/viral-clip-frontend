import { NextResponse } from "next/server";
import { generateCapcutJson } from "@/lib/edl/generateCapcutJson";

export async function GET() {
  const json = generateCapcutJson("ViralClip", [
    { id: "a", start: 0, end: 5, text: "Intro" },
    { id: "b", start: 5, end: 12, text: "Body" }
  ]);
  return NextResponse.json(json);
}
