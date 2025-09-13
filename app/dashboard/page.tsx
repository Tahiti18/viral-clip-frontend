
import { getJSON, API } from '@/lib/api'
export default async function Dashboard(){
  let counts = { jobs: 0, templates: 0 }
  try { counts = await getJSON('/api/metrics') } catch {}
  return (<main>
    <h1>Dashboard</h1>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card"><h2>Stats</h2><div className="text-sm">Jobs: {counts.jobs}</div><div className="text-sm">Templates: {counts.templates}</div></div>
      <div className="card"><h2>Config</h2><div className="text-sm">API_BASE: {API || '(not set)'}</div></div>
    </div>
  </main>)
}
