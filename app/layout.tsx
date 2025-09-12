import "./globals.css";
export const metadata = { title: "UnityLab — AI Video Repurposing & Growth Suite", description: "SLA’d rendering, A/B hooks, and brand compliance." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-bg text-white antialiased">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a className="flex items-center gap-2 font-semibold" href="/"><span className="size-2 rounded-full bg-gradient-to-r from-brand to-brand2" />UnityLab</a>
        <nav className="flex items-center gap-4">
          <a className="text-zinc-400 hover:text-white" href="/templates">Templates</a>
          <a className="text-zinc-400 hover:text-white" href="/app">App</a>
          <a className="rounded-lg border border-white/10 px-3 py-2" href="/app">Sign in</a>
          <a className="rounded-lg bg-gradient-to-r from-brand to-brand2 px-3 py-2" href="/app">Get started</a>
        </nav>
      </div>
    </header>
    {children}
    <footer className="border-t border-white/10"><div className="mx-auto max-w-6xl px-5 py-10 flex items-center justify-between text-zinc-400">
      <div>© UnityLab</div><div className="flex gap-4"><a href="/terms">Terms</a><a href="/privacy">Privacy</a></div></div></footer>
  </body></html>);
}
