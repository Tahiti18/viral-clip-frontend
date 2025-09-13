
import { Timeline } from './types'
export default function generateCapcutJson(projectName: string, t: Timeline){
  return {
    project: { name: projectName, fps: t.fps, resolution: t.resolution || "1080p" },
    version: 1,
    timeline: t.clips.map((c)=>({ id: c.id, start: c.start, end: c.end, text: c.text||null, src: c.src||null }))
  }
}
