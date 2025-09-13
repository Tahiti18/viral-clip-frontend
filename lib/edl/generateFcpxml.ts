
import { Timeline } from './types'
function esc(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&apos;')}
export default function generateFcpxml(projectName: string, t: Timeline): string {
  const items = t.clips.map((c,i)=>`<clip name="${esc(c.text||c.id)}" offset="${c.start}/1s" duration="${(c.end-c.start)}/1s"></clip>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.10">
  <resources/>
  <library>
    <event name="${esc(projectName)}">
      <project name="${esc(projectName)}">
        <timeline>${items}</timeline>
      </project>
    </event>
  </library>
</fcpxml>`;
}
