export type Caption = { start: number; end: number; text: string }
export function toSrt(caps: Caption[]): string {
  return caps.map((c,i)=>`${i+1}\n00:00:00,000 --> 00:00:01,000\n${c.text}\n`).join("\n")
}
