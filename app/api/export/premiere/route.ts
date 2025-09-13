
import { NextResponse } from 'next/server'
import generatePremiereXml from '../../../../lib/edl/generatePremiereXml'
import { Timeline } from '../../../../lib/edl/types'
export async function GET(){
  const t:Timeline={fps:30,clips:[{id:'intro',start:0,end:3,text:'Intro'},{id:'body',start:3,end:8,text:'Body'}]}
  const xml = generatePremiereXml('UnityLab Project', t)
  return new NextResponse(xml, { headers:{ 'Content-Type':'application/xml; charset=utf-8', 'Content-Disposition':'attachment; filename="premiere.xml"' } })
}
