import type { Clip } from "./generatePremiereXml";
export function generateCapcutJson(projectName: string, clips: Clip[]) {
  return {
    project: projectName,
    version: 1,
    timeline: clips.map((c, i) => ({
      id: c.id || `clip-${i}`,
      start: c.start,
      end: c.end,
      text: c.text || null
    }))
  };
}
