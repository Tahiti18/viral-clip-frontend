// lib/edl/captions.ts

export type Caption = {
  /** start time in milliseconds */
  start: number;
  /** end time in milliseconds */
  end: number;
  /** caption text (single line or with \n for multi-line) */
  text: string;
};

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}
function pad3(n: number) {
  return n.toString().padStart(3, '0');
}

function msToSrtTimestamp(ms: number): string {
  const totalMs = Math.max(0, Math.floor(ms));
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const millis = totalMs % 1000;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)},${pad3(millis)}`;
}

function msToVttTimestamp(ms: number): string {
  const totalMs = Math.max(0, Math.floor(ms));
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const millis = totalMs % 1000;
  // WebVTT requires dot for milliseconds; hours may be omitted if 0, but we’ll keep it consistent.
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}.${pad3(millis)}`;
}

/** Convert captions to SRT format */
export function toSrt(captions: Caption[]): string {
  const lines: string[] = [];
  captions.forEach((c, i) => {
    lines.push(String(i + 1));
    lines.push(`${msToSrtTimestamp(c.start)} --> ${msToSrtTimestamp(c.end)}`);
    // Ensure CRLF line breaks inside blocks per SRT readers’ expectations.
    lines.push(...c.text.split('\n'));
    lines.push(''); // blank line between cues
  });
  return lines.join('\r\n');
}

/** Convert captions to WebVTT format */
export function toVtt(captions: Caption[]): string {
  const lines: string[] = ['WEBVTT', '']; // header + blank line
  captions.forEach((c) => {
    lines.push(`${msToVttTimestamp(c.start)} --> ${msToVttTimestamp(c.end)}`);
    lines.push(...c.text.split('\n'));
    lines.push(''); // blank line between cues
  });
  return lines.join('\n');
}

/** Simple sample data you can replace with real timeline output later */
export function sampleCaptions(): Caption[] {
  return [
    { start: 0, end: 2000, text: 'Hello there.' },
    { start: 2200, end: 5000, text: 'This is a sample caption.\nSecond line.' },
    { start: 5200, end: 8000, text: 'Export me as SRT or VTT.' },
  ];
}
