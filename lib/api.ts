// lib/api.ts
// Single place to call your backend with robust error handling.

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
if (!API_BASE) {
  // Fail early during build if the env var is missing
  throw new Error('NEXT_PUBLIC_API_BASE is not set');
}

export type Plan = {
  id: string;
  lane: number;
  max_input_minutes: number;
  target_multiplier: number;
  credit_multiplier: number;
};

export type Job = {
  id: string;
  org_id: string;
  source_url: string;
  input_minutes: number;
  plan_id: string;
  lane: number;
  priority_score: number;
  state: string;
  created_at: string;   // ISO
  updated_at: string;   // ISO
  eta_seconds?: number | null;
  idempotency_key?: string | null;
};

export type NewJob = {
  org_id: string;
  source_url: string;
  input_minutes: number;
  plan_id: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    // Next.js: opt into SSR caching semantics where appropriate; default no-cache
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const msg = `API ${res.status} ${res.statusText} for ${path}${text ? `: ${text}` : ''}`;
    throw new Error(msg);
  }
  // Gracefully handle empty bodies
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    // @ts-ignore – allow non-JSON replies (e.g., empty arrays from FastAPI returning [])
    return (await res.text()) as unknown as T;
  }
  return res.json() as Promise<T>;
}

/** Health check */
export function apiHealth() {
  return request<{ status: string } | string>('/health');
}

/** List jobs */
export function listJobs() {
  // Adjust the path if your FastAPI routes use a prefix (e.g. /api/jobs).
  return request<Job[]>('/api/jobs');
}

/** Create a new job */
export function createJob(payload: NewJob) {
  return request<Job>('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** Get a single job */
export function getJob(id: string) {
  return request<Job>(`/api/jobs/${encodeURIComponent(id)}`);
}

/** Cancel / delete a job (if your API supports it) */
export function deleteJob(id: string) {
  return request<{ ok: true }>(`/api/jobs/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

/** List plans (used by the job form) */
export function listPlans() {
  return request<Plan[]>('/api/plans');
}
