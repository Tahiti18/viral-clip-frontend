
import { NextResponse } from 'next/server'
import generateCapcutJson from '../../../../lib/edl/generateCapcutJson'
import { Timeline } from '../../../../lib/edl/types'
export async function GET(){
  const t:Timeline={fps:30,clips:[{id:'intro',start:0,end:3,text:'Intro'},{id:'body',start:3,end:8,text:'Body'}]}
  const json = generateCapcutJson('UnityLab Project', t)
  return NextResponse.json(json)
}
