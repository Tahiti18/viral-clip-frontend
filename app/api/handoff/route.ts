import { NextRequest } from "next/server"; import JSZip from "jszip"; import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
type Cue = { index: number; start: number; end: number; text: string; style?: { preset?: string } };
type Timeline = { title:string; fps:number; width:number; height:number; clips:any[]; duration:number; captions?: {start:number; end:number; text:string; style?: any}[]; };
async function buildInstructionsPDF(title: string, fps: number){
  const pdf = await PDFDocument.create(); const page = pdf.addPage([612,792]); const { height } = page.getSize();
  const fontB = await pdf.embedFont(StandardFonts.HelveticaBold); const font = await pdf.embedFont(StandardFonts.Helvetica);
  let y = height - 50;
  const write = (txt:string, size=12, bold=false, color=rgb(1,1,1)) => { const f = bold ? fontB : font; page.drawText(txt,{x:50,y,size,font:f,color}); y -= size + 8; };
  write("UnityLab – Editor Handoff", 20, true); write(title, 14, false, rgb(0.8,0.9,1)); y -= 6;
  write("What’s inside",14,true); write("• cues.json – timings & text for MOGRT / titles"); write("• README.txt – quick checklist");
  y -= 6; write("Premiere Pro – quick steps",14,true); write("1) Essential Graphics > Install ‘UnityLab_*.mogrt’ files."); write("2) File > Scripts > Run… ‘pr_apply_cues.jsx’, select cues.json.");
  y -= 6; write("Final Cut / Resolve – quick steps",14,true); write("1) Import FCPXML. 2) Import SRT or use Titles. 3) Apply your Title preset.");
  y -= 6; write("Specs",14,true); write(`• Frame rate: ${fps} fps`); write("• Ensure fonts installed.");
  return await pdf.save();
}
function toCueSheet(tl: Timeline, preset = "CleanNews"){ const cues: Cue[] = (tl.captions||[]).map((c,i)=>({ index:i+1, start:c.start, end:c.end, text:c.text, style:{ preset:c.style?.preset || preset } })); return { title: tl.title, fps: tl.fps, width: tl.width, height: tl.height, cues }; }
export async function POST(req: NextRequest){
  const { preset="CleanNews", ...tl } = await req.json() as (Timeline & { preset?: string });
  const cueSheet = toCueSheet(tl as Timeline, preset); const cueStr = JSON.stringify(cueSheet, null, 2);
  const instructionsPdf = await buildInstructionsPDF(cueSheet.title, cueSheet.fps);
  const readme = `UnityLab – Editor Handoff\n\nFiles:\n- cues.json\n- Instructions.pdf\n`;
  const zip = new JSZip(); zip.file("cues.json", cueStr); zip.file("README.txt", readme); zip.file("Instructions.pdf", instructionsPdf);
  const bytes = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
  const fname = `${cueSheet.title.replace(/\W+/g,"_")}_handoff.zip`; return new Response(bytes, { headers: { "Content-Type":"application/zip", "Content-Disposition": `attachment; filename="${fname}"` } });
}
