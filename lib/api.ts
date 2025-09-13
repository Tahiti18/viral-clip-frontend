
const RAW = (process.env.NEXT_PUBLIC_API_BASE || "").trim();
export const API_BASE = RAW.replace(/\/+$/, "");

function buildUrl(path: string) { if(!path.startsWith("/")) path = "/" + path; return `${API_BASE}${path}`; }

async function request(method: string, path: string, body?: any) {
  const controller = new AbortController(); const id = setTimeout(()=>controller.abort(), 20000);
  const init: RequestInit = { method, signal: controller.signal, headers: { "Accept":"application/json" } };
  if(body !== undefined){ (init.headers as any)["Content-Type"]="application/json"; init.body = JSON.stringify(body); }
  const res = await fetch(buildUrl(path), init).catch((e)=>{clearTimeout(id); throw new Error(`Network: ${e?.message||e}`)});
  clearTimeout(id);
  if(!res.ok){ const text = await res.text().catch(()=>res.statusText); throw new Error(`HTTP ${res.status}: ${text}`); }
  const ct = res.headers.get("content-type") || "";
  if(ct.includes("application/json")) return res.json();
  return res.text();
}

export const getJSON = <T=any>(path: string) => request("GET", path) as Promise<T>;
export const postJSON = <T=any>(path: string, body: any) => request("POST", path, body) as Promise<T>;
export async function healthCheck(): Promise<boolean>{ try{ const r = await getJSON<{ok:boolean}>("/api/health"); return !!r?.ok }catch{ return false } }
