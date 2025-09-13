
import { getJSON } from '@/lib/api'
type Job={id:string; status:string; created_at?:string}
export default async function Jobs(){
  let jobs:Job[]=[]; try{ jobs=await getJSON('/api/jobs') } catch {}
  return (<main>
    <h1>Jobs</h1>
    <div className="card">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-zinc-400"><th>ID</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
        {jobs.length? jobs.map(j=>(<tr key={j.id}><td>#{j.id.slice(0,6)}</td><td>{j.status}</td><td>{j.created_at||'-'}</td></tr>)): 
          <tr><td colSpan={3} className="text-zinc-400">No jobs</td></tr>}
        </tbody>
      </table>
    </div>
  </main>)
}
