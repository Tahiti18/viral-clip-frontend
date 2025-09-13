
import { getJSON } from '../../lib/api'
type T = { id:string; name:string; category?:string }
export default async function Templates(){
  let templates:T[]=[]; try{ templates = await getJSON('/api/templates') } catch {}
  return (<main><h1>Templates</h1>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.length? templates.map(t=>(
        <div key={t.id} className="card">
          <div className="font-semibold">{t.name}</div>
          <div className="text-xs text-zinc-400">{t.category||'general'}</div>
          <form action="/api/queue" method="post" className="mt-3">
            <input type="hidden" name="templateId" value={t.id}/>
            <button className="btn" type="submit">Create job</button>
          </form>
        </div>
      )): <div className="text-sm text-zinc-400">No templates</div>}
    </div></main>)
}
