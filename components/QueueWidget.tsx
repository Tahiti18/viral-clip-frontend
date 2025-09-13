
'use client'
import { useEffect, useState } from 'react'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''
type Lane = { id: string; etaSeconds?: number }
type QueueResp = { lanes: Lane[] } | null
export default function QueueWidget(){
  const [data,setData]=useState<QueueResp>(null); const [err,setErr]=useState<string|null>(null)
  useEffect(()=>{(async()=>{try{const r=await fetch(`${API_BASE}/v1/queue`,{cache:'no-store'}); if(!r.ok)throw new Error(`HTTP ${r.status}`); setData(await r.json())}catch(e:any){setErr(e?.message||'load error')}})()},[])
  if(!API_BASE) return <div style={{color:'#b91c1c'}}>NEXT_PUBLIC_API_BASE not set</div>
  if(err) return <div style={{color:'#b91c1c'}}>Queue error: {err}</div>
  if(!data) return <div style={{opacity:.7}}>Loading queue…</div>
  return <div style={{border:'1px solid #e5e7eb',borderRadius:8,padding:16}}>
    <div style={{fontWeight:600,marginBottom:8}}>Queue</div>
    <ul style={{listStyle:'none',padding:0,margin:0}}>
      {data.lanes?.map(l=><li key={l.id} style={{fontSize:14}}><span style={{fontFamily:'monospace'}}>{l.id}</span>{l.etaSeconds!=null?` • ETA ${Math.round(l.etaSeconds)}s`:''}</li>)}
    </ul>
  </div>
}
