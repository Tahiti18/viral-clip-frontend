import { NextResponse } from 'next/server'; import generateFcpxml from '@/lib/edl/generateFcpxml'; export async function GET(){return NextResponse.json(generateFcpxml())}
