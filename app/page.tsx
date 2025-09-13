
import QueueWidget from "@/components/QueueWidget";
import JobStreamPanel from "@/components/JobStreamPanel";
export default function Home(){ return (<main style={{maxWidth:900,margin:'40px auto',padding:'0 16px'}}><h1 style={{fontSize:28,fontWeight:700,marginBottom:16}}>Viral Clip — Control</h1><div style={{display:'grid',gap:16}}><QueueWidget/><JobStreamPanel/></div></main>); }
