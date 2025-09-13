import { NextResponse } from 'next/server'; import generateCapcutJson from '@/lib/edl/generateCapcutJson'; export async function GET(){return NextResponse.json(generateCapcutJson())}
