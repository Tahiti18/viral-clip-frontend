
'use client'
import { useState } from 'react'
export default function JobStreamPanel(){
  const [downloading,setDownloading]=useState(false)
  const download = async () => {
    setDownloading(true)
    try{
      const r=await fetch('/api/handoff'); const b=await r.blob()
      const url=URL.createObjectURL(b); const a=document.createElement('a')
      a.href=url; a.download='handoff.zip'; a.click(); URL.revokeObjectURL(url)
    } finally { setDownloading(false) }
  }
  return (<div className="card"><h2>Editor handoff</h2>
    <button className="btn" onClick={download} disabled={downloading}>
      {downloading? 'Preparing…':'Download handoff.zip'}
    </button></div>)
}
