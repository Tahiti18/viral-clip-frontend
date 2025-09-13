
export type Caption = { start: number; end: number; text: string };
function pad(n:number,l=2){return String(n).padStart(l,'0')}
function toSrtTime(sec:number){ const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), ms=Math.round((sec%1)*1000); return `${pad(h)}:${pad(m)}:${pad(s)},${String(ms).padStart(3,'0')}`}
function toVttTime(sec:number){ const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), ms=Math.round((sec%1)*1000); return `${pad(h)}:${pad(m)}:${pad(s)}.${String(ms).padStart(3,'0')}`}
export function toSrt(caps: Caption[]): string { return caps.map((c,i)=>`${i+1}\n${toSrtTime(c.start)} --> ${toSrtTime(c.end)}\n${c.text}\n`).join("\n") }
export function toVtt(caps: Caption[]): string { const body=caps.map(c=>`${toVttTime(c.start)} --> ${toVttTime(c.end)}\n${c.text}\n`).join("\n"); return `WEBVTT\n\n${body}` }
export function sampleCaptions(): Caption[]{ return [ {start:0,end:2.3,text:"Welcome to UnityLab"}, {start:2.3,end:5.0,text:"This is a sample caption"} ] }
