import type { Clip } from "./generateCapcutJson"
export function generateFcpxml(projectName: string, clips: Clip[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?><fcpxml><project name="${projectName}">${clips.length}</project></fcpxml>`
}
