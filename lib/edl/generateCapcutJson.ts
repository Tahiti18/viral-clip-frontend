export type Clip = { id: string; start: number; end: number; text?: string }
export function generateCapcutJson(projectName: string, clips: Clip[]) {
  return { project: projectName, version: 1, timeline: clips }
}
