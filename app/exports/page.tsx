
export default function Exports(){
  return (<main><h1>Exports</h1>
    <div className="grid md:grid-cols-3 gap-4">
      <a className="card" href="/api/export/premiere">Premiere XML</a>
      <a className="card" href="/api/export/fcpxml">FCPXML</a>
      <a className="card" href="/api/export/capcut">CapCut JSON</a>
      <a className="card" href="/api/export/srt">SRT captions</a>
      <a className="card" href="/api/export/vtt">VTT captions</a>
    </div></main>)
}
