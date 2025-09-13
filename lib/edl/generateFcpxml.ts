
import type { Clip } from "./generatePremiereXml";
export function generateFcpxml(projectName: string, clips: Clip[]): string {
  const esc = (s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&apos;");
  const items = clips.map((c,i)=>`<clip name="${esc(c.text||`clip-${i}`)}" offset="${c.start}/1s" duration="${c.end-c.start}/1s"></clip>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE fcpxml><fcpxml version="1.10"><library><event name="${esc(projectName)}"><project name="${esc(projectName)}"><timeline>${items}</timeline></project></event></library></fcpxml>`;
}
