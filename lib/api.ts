
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";
export async function getJSON(path: string) {
  const r = await fetch(`${API_BASE}${path}`, { cache:'no-store' });
  if(!r.ok) throw new Error(String(r.status));
  return r.json();
}
export async function postJSON(path: string, body:any) {
  const r = await fetch(`${API_BASE}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if(!r.ok) throw new Error(String(r.status));
  return r.json();
}
