
export default function Settings(){
  return (<main>
    <h1>Settings</h1>
    <div className="card text-sm space-y-2">
      <div>Frontend build: v1.0.0</div>
      <div>Change API base by updating <code>NEXT_PUBLIC_API_BASE</code> in Netlify → Environment variables.</div>
    </div>
  </main>)
}
