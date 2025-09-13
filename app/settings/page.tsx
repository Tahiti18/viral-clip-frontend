
export default function Settings(){
  return (<main><h1>Settings</h1>
    <div className="card text-sm space-y-2">
      <div>Frontend build: v1.0.1</div>
      <div>Change API base via <code>NEXT_PUBLIC_API_BASE</code> (Netlify → Env vars).</div>
    </div></main>)
}
