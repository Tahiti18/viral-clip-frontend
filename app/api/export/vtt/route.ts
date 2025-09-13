
import { NextResponse } from 'next/server'
import { toVtt, sampleCaptions } from '../../../../lib/edl/captions'
export async function GET(){
  const vtt = toVtt(sampleCaptions())
  const ab = new TextEncoder().encode(vtt).buffer
  return new NextResponse(ab, { headers:{ 'Content-Type':'text/vtt; charset=utf-8', 'Content-Disposition':'attachment; filename="captions.vtt"' } })
}
