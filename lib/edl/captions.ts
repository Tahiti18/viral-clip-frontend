/**
 * Caption utilities for EDL/exports
 */

export type Caption = {
  startMs: number;   // inclusive
  endMs: number;     // exclusive
  text: string;
};

/** zero-pad helper */
const z = (n: number, len: number) => String(n).padStart(len, "0");

/** converts milliseconds -> SRT timestamp "HH:MM:SS,mmm" */
export function msToSrtTime(ms: number): string {
  const sign = ms < 0 ? "-" : "";
  ms = Math.abs(ms);
  const hours = Math.floor(ms / 3_600_000);
  ms -= hours * 3_600_000;
  const minutes = Math.floor(ms / 60_000);
  ms -= minutes * 60_000;
  const seconds = Math.floor(ms / 1000);
  const millis = ms - seconds * 1000;
  return `${sign}${z(hours,2)}:${z(minutes,2)}:${z(seconds,2)},${z(millis,3)}`;
}

/** Convert a list of captions to .srt text */
export function toSrt(items: Caption[]): string {
  return items
    .map((c, i) => {
      const idx = i + 1;
      const start = msToSrtTime(c.startMs);
      const end = msToSrtTime(c.endMs);
      return `${idx}\n${start} --> ${end}\n${c.text}\n`;
    })
    .join("\n");
}

/** sample captions used for testing/export preview */
export function sampleCaptions(): Caption[] {
  return [
    { startMs: 0, endMs: 2000, text: "Hello there!" },
    { startMs: 2000, endMs: 4000, text: "This is a demo caption." },
    { startMs: 4000, endMs: 7000, text: "Exported as a downloadable ZIP." }
  ];
}
