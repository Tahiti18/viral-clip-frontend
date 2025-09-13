// lib/edl/captions.ts

export type Caption = {
  startMs: number;   // start time in milliseconds
  endMs: number;     // end time in milliseconds
  text: string;
};

export function sampleCaptions(): Caption[] {
  return [
    { startMs: 0,        endMs: 2000,   text: 'Hello' },
    { startMs: 2000,     endMs: 4000,   text: 'from UnityLab' },
    { startMs: 4000,     endMs: 6000,   text: 'handoff package' }
  ];
}

// Convert ms → "hh:mm:ss,mmm"
function toSrtTime(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const ms3 = ms % 1000;
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms3, 3)}`;
}

export function toSrt(items: Caption[]): string {
  return items
    .map((c, i) => {
      const start = toSrtTime(c.startMs);
      const end = toSrtTime(c.endMs);
      return `${i + 1}\n${start} --> ${end}\n${c.text}\n`;
    })
    .join('\n');
}
