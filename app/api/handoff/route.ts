import { NextResponse } from 'next/server'
import JSZip from 'jszip'
import { toSrt, sampleCaptions } from '../../../lib/edl/captions'

export async function GET(){
  const zip = new JSZip()
  const srt = toSrt(sampleCaptions())
  zip.file('README.txt','UnityLab editor handoff')
  zip.file('captions.srt', srt)

  // Generate as arraybuffer to satisfy NextResponse BodyInit types
  const arrayBuffer = await zip.generateAsync({ type:'arraybuffer' })

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type':'application/zip',
      'Content-Disposition':'attachment; filename="handoff.zip"'
    }
  })
}
