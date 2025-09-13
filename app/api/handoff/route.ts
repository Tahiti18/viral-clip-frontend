import { NextResponse } from 'next/server'
import JSZip from 'jszip'
import { toSrt, sampleCaptions } from '../../../lib/edl/captions'

export async function GET() {
  const zip = new JSZip()
  zip.file('README.txt', 'UnityLab editor handoff')
  zip.file('captions.srt', toSrt(sampleCaptions()))
  const bytes = await zip.generateAsync({ type: 'uint8array' })
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="handoff.zip"',
    },
  })
}
