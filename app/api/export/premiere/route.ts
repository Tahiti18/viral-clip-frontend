import { NextResponse } from 'next/server'; import generatePremiereXml from '../../../../lib/edl/generatePremiereXml'; export async function GET(){return NextResponse.json(generatePremiereXml())}
