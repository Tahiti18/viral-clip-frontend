
'use client'
import { useEffect, useState } from 'react'
import { getJSON } from '../lib/api'
type Job = { id:string; status:string; created_at?:string }
export default function QueueWidget(){
  const [jobs,setJobs]=useState<Job[]>([])
  useEffect(()=>{ getJSON('/api/jobs').then(setJobs).catch(()=>setJobs([])) },[])
  return (<div className="card"><h2>Queue</h2>
    <ul className="space-y-1">{jobs.length? jobs.map(j=>(
      <li key={j.id} className="flex justify-between text-sm">
        <span>#{j.id.slice(0,6)}</span><span>{j.status}</span></li>
    )): <li className="text-sm text-zinc-400">No jobs</li>}</ul></div>)
}
