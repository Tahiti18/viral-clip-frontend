// app/api/handoff/route.ts
import { NextResponse } from 'next/server'
import JSZip from 'jszip'
import { toSrt, sampleCaptions } from '../../../../lib/edl/captions'

// Make sure this runs on Node (Netlify supports this)
export const runtime = 'nodejs'

export async function GET() {
  const zip = new JSZip()

  // package contents
  zip.file('README.txt', 'UnityLab editor handoff')
  zip.file('captions.srt', toSrt(sampleCaptions()))

  // Get a Uint8Array from JSZip…
  const u8 = await zip.generateAsync({ type: 'uint8array' })

  // …then hand NextResponse an ArrayBuffer (which BodyInit accepts)
  const ab = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength)

  return new NextResponse(ab, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="handoff.zip"'
    }
  })
}
