import { NextResponse } from 'next/server'
import { toSrt, sampleCaptions } from '../../../../lib/edl/captions'

export async function GET() {
  const srt = toSrt(sampleCaptions())
  return new NextResponse(srt, {
    headers: {
      'Content-Type': 'application/x-subrip; charset=utf-8',
      'Content-Disposition': 'attachment; filename="captions.srt"',
    },
  })
}
