// app/api/export/vtt/route.ts
import { NextResponse } from 'next/server'
import { toVtt, sampleCaptions } from '../../../lib/edl/captions'

export async function GET() {
  const vtt = toVtt(sampleCaptions())
  return new NextResponse(vtt, {
    headers: {
      'Content-Type': 'text/vtt; charset=utf-8',
      'Content-Disposition': 'attachment; filename="captions.vtt"',
    },
  })
}
