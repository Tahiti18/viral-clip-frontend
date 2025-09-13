import type { Clip } from "./generateCapcutJson"
export function generatePremiereXml(projectName: string, clips: Clip[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?><xmeml><sequence><name>${projectName}</name></sequence></xmeml>`
}
