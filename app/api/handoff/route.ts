// app/api/handoff/route.ts
import { NextResponse } from 'next/server'
import JSZip from 'jszip'
import { toSrt, sampleCaptions } from '../../../lib/edl/captions'

// Ensure Node runtime (needed for Buffer on Netlify)
export const runtime = 'nodejs'

export async function GET() {
  const zip = new JSZip()

  const srt = toSrt(sampleCaptions())

  zip.file('README.txt', 'UnityLab editor handoff')
  zip.file('captions.srt', srt)

  const bytes = await zip.generateAsync({ type: 'uint8array' })

  return new NextResponse(bytes, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="handoff.zip"'
    }
  })
}
