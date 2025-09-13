export type Caption = {
  startMs: number;   // inclusive
  endMs: number;     // exclusive
  text: string;
};

export function msToSrtTime(ms: number): string {
  const sign = ms < 0 ? "-" : "";
  ms = Math.abs(ms);
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  const millis = Math.floor(ms % 1000);
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${sign}${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(millis, 3)}`;
}

export function toSrt(captions: Caption[]): string {
  return captions
    .map((c, i) => {
      const idx = i + 1;
      const start = msToSrtTime(c.startMs);
      const end = msToSrtTime(c.endMs);
      return `${idx}\n${start} --> ${end}\n${c.text}\n`;
    })
    .join("\n")
    .trim() + "\n";
}

// Demo captions so the API works immediately
export function sampleCaptions(): Caption[] {
  return [
    { startMs: 0, endMs: 2000, text: "Hello from Viral Clip!" },
    { startMs: 2000, endMs: 5000, text: "This SRT came from your Netlify build." },
    { startMs: 5000, endMs: 8000, text: "Replace with real timeline data anytime." },
  ];
}
