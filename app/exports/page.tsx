"use client";
import { useState } from "react";
const demo = { title:"UnityLab_Demo", fps:30, width:1080, height:1920, duration:20, audioUrl:"",
  clips:[ {id:"a1",srcUrl:"https://example.com/a.mp4",start:0,in:10,out:15,track:1}, {id:"b1",srcUrl:"https://example.com/b.mp4",start:5,in:0,out:7,track:2}, {id:"c1",srcUrl:"https://example.com/c.mp4",start:12,in:3,out:18,track:1} ],
  captions:[ {start:1,end:4,text:"Stop scrolling. Watch this."}, {start:6,end:9,text:"Big idea in 10 seconds."} ]
};
async function postAndDownload(url: string, body: any){ const r = await fetch(url,{method:"POST",body:JSON.stringify(body),headers:{"Content-Type":"application/json"}}); const blob=await r.blob(); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=(r.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1])||"export"; document.body.appendChild(a); a.click(); a.remove(); }
export default function ExportsPage(){
  const [tl,setTl]=useState(JSON.stringify(demo,null,2)); const parsed=()=>JSON.parse(tl); const [embedTitles,setEmbedTitles]=useState(true);
  return (<main className="py-10"><div className="mx-auto max-w-6xl px-5 grid gap-4 md:grid-cols-2">
    <div><h1 className="text-xl font-semibold">Export EDL</h1><p className="text-zinc-400 text-sm">Paste a Timeline JSON and export to your NLE.</p>
      <textarea className="mt-2 h-96 w-full rounded-lg border border-white/10 bg-card p-3 text-xs" value={tl} onChange={e=>setTl(e.target.value)} />
    </div>
    <div className="rounded-lg border border-white/10 bg-card p-4"><h2 className="font-semibold">Actions</h2>
      <div className="mt-3 grid gap-2">
        <button className="rounded-lg bg-gradient-to-r from-brand to-brand2 px-4 py-2" onClick={()=>postAndDownload("/api/export/premiere", parsed())}>Export Premiere XML</button>
        <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" checked={embedTitles} onChange={e=>setEmbedTitles(e.target.checked)} />Embed captions as Titles (FCPXML)</label>
        <button className="rounded-lg bg-gradient-to-r from-brand to-brand2 px-4 py-2" onClick={()=>postAndDownload("/api/export/fcpxml",{...parsed(), embedTitles})}>Export FCPXML (Resolve)</button>
        <button className="rounded-lg border border-white/10 px-4 py-2" onClick={()=>postAndDownload("/api/export/srt", parsed())}>Export SRT (sidecar)</button>
        <button className="rounded-lg border border-white/10 px-4 py-2" onClick={()=>postAndDownload("/api/export/capcut", parsed())}>Export CapCut JSON (TEMP)</button>
        <button className="rounded-lg bg-gradient-to-r from-brand to-brand2 px-4 py-2" onClick={()=>postAndDownload("/api/handoff", parsed())}>Download Editor Handoff Kit (.zip)</button>
      </div>
    </div></div></main>);
}
