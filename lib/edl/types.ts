
export type Clip = { id: string; src?: string; start: number; end: number; text?: string };
export type Timeline = { fps: number; resolution?: string; clips: Clip[] };
