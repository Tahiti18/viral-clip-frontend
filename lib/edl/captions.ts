// lib/edl/captions.ts
export type Caption = { startMs: number; endMs: number; text: string }

const pad = (n: number, w = 2) => String(n).padStart(w, '0')

const fmtSrt = (ms: number) => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const msPart = ms % 1000
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(msPart, 3)}`
}

const fmtVtt = (ms: number) => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const msPart = ms % 1000
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(msPart, 3)}`
}

export function toSrt(caps: Caption[]): string {
  return caps
    .map((c, i) => `${i + 1}\n${fmtSrt(c.startMs)} --> ${fmtSrt(c.endMs)}\n${c.text}\n`)
    .join('\n')
}

export function toVtt(caps: Caption[]): string {
  const body = caps
    .map(c => `${fmtVtt(c.startMs)} --> ${fmtVtt(c.endMs)}\n${c.text}\n`)
    .join('\n')
  return `WEBVTT\n\n${body}`
}

export function sampleCaptions(): Caption[] {
  return [
    { startMs: 0, endMs: 2000, text: 'Hello!' },
    { startMs: 2000, endMs: 5000, text: 'This is a demo caption.' },
    { startMs: 5000, endMs: 8000, text: 'Exported as SRT or VTT.' },
  ]
}
