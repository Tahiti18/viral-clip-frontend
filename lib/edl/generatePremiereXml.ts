
import { Timeline } from './types'
function esc(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&apos;')}
export default function generatePremiereXml(projectName: string, t: Timeline): string {
  const items = t.clips.map((c,i)=>`<clipitem id="clip-${i}"><name>${esc(c.text||c.id)}</name><start>${Math.round(c.start*t.fps)}</start><end>${Math.round(c.end*t.fps)}</end></clipitem>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?><xmeml version="5"><sequence><name>${esc(projectName)}</name><rate><timebase>${t.fps}</timebase><ntsc>FALSE</ntsc></rate><media><video><track>${items}</track></video></media></sequence></xmeml>`;
}
