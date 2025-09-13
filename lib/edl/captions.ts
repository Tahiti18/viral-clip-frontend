
export type Caption = { start: number; end: number; text: string };
function srtTime(t:number){ const h=Math.floor(t/3600); const m=Math.floor((t%3600)/60); const s=Math.floor(t%60); const ms=Math.floor((t%1)*1000); const pad=(n:number,l=2)=>String(n).padStart(l,'0'); return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms,3)}`; }
export function toSrt(caps: Caption[]): string {
  return caps.map((c,i)=>`${i+1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${c.text}\n`).join("\n");
}
