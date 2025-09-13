const RAW = (process.env.NEXT_PUBLIC_API_BASE || "").trim();
export const API_BASE = RAW.replace(/\/+$/, ""); // strip trailing slash(s)

function buildUrl(path: string) {
  if (!API_BASE) throw new Error("NEXT_PUBLIC_API_BASE is not set");
  if (!path.startsWith("/")) path = `/${path}`;
  return `${API_BASE}${path}`;
}

async function request<T>(method: "GET"|"POST"|"PUT"|"PATCH"|"DELETE", path: string, body?: any): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000); // 20s timeout

  const opts: RequestInit = {
    method,
    headers: { "Accept": "application/json" },
    signal: controller.signal
  };
  if (body !== undefined) {
    (opts.headers as Record<string,string>)["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(buildUrl(path), opts).catch((e) => {
    clearTimeout(id);
    throw new Error(`Network error: ${e?.message || e}`);
  });
  clearTimeout(id);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  // try json, fall back to text
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json() as Promise<T>;
  // @ts-ignore - allow string returns if backend responds text/plain for some routes
  return (await res.text()) as T;
}

export const getJSON = <T=any>(path: string) => request<T>("GET", path);
export const postJSON = <T=any>(path: string, body: any) => request<T>("POST", path, body);

// Optional: quick backend probe for /api/health
export async function healthCheck(): Promise<boolean> {
  try { const r = await getJSON<{ok:boolean}>("/api/health"); return !!r?.ok; }
  catch { return false; }
}
