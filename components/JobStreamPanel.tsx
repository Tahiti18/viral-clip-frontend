
'use client'
import { useEffect, useRef, useState } from 'react'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''
export default function JobStreamPanel(){
  const [jobId,setJobId]=useState(''); const [lines,setLines]=useState<string[]>([]); const esRef=useRef<EventSource|null>(null)
  useEffect(()=>()=>{esRef.current?.close()},[])
  function start(){ if(!API_BASE||!jobId) return; esRef.current?.close(); const es=new EventSource(`${API_BASE}/v1/jobs/${encodeURIComponent(jobId)}/stream`); es.onmessage=(e)=>setLines(p=>[...p,e.data]); es.onerror=()=>setLines(p=>[...p,'[stream error]']); esRef.current=es }
  return <div style={{border:'1px solid #e5e7eb',borderRadius:8,padding:16}}>
    <div style={{fontWeight:600,marginBottom:8}}>Job Stream</div>
    <div style={{display:'flex',gap:8}}>
      <input style={{border:'1px solid #e5e7eb',padding:'6px 8px',flex:1}} placeholder="Enter jobId" value={jobId} onChange={e=>setJobId(e.target.value)} />
      <button style={{border:'1px solid #e5e7eb',padding:'6px 12px'}} onClick={start}>Start</button>
    </div>
    <pre style={{background:'#111827',color:'#bbf7d0',fontSize:12,padding:12,height:192,overflow:'auto',borderRadius:6,marginTop:12}}>{lines.join('\n')}</pre>
    {!API_BASE && <div style={{color:'#b91c1c'}}>Set NEXT_PUBLIC_API_BASE to stream.</div>}
  </div>
}
