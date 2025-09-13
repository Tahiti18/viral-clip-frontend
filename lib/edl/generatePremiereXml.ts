
export type Clip = { id: string; start: number; end: number; text?: string };
export function generatePremiereXml(projectName: string, clips: Clip[]): string {
  const esc = (s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&apos;");
  const items = clips.map((c,i)=>`<clipitem id="clip-${i}"><name>${esc(c.text||`clip-${i}`)}</name><start>${c.start}</start><end>${c.end}</end></clipitem>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?><xmeml version="5"><sequence><name>${esc(projectName)}</name><media><video><track>${items}</track></video></media></sequence></xmeml>`;
}
