
export default function Nav(){
  return (<nav className="w-full border-b border-zinc-700">
    <div className="container flex items-center justify-between py-3">
      <div className="font-semibold">UnityLab</div>
      <div className="space-x-4 text-sm">
        <a href="/dashboard">Dashboard</a>
        <a href="/templates">Templates</a>
        <a href="/jobs">Jobs</a>
        <a href="/exports">Exports</a>
        <a href="/settings">Settings</a>
      </div>
    </div>
  </nav>)
}
