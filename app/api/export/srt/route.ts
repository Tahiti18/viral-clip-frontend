
import { NextResponse } from 'next/server'
import { toSrt, sampleCaptions } from '../../../../lib/edl/captions'
export async function GET(){
  const srt = toSrt(sampleCaptions())
  const ab = new TextEncoder().encode(srt).buffer
  return new NextResponse(ab, { headers:{ 'Content-Type':'application/x-subrip; charset=utf-8', 'Content-Disposition':'attachment; filename="captions.srt"' } })
}
