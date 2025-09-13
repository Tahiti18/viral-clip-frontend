
import QueueWidget from '../components/QueueWidget'
import JobStreamPanel from '../components/JobStreamPanel'
export default function Home(){
  return (<main><h1>Viral Clip — Control</h1>
    <div className="grid md:grid-cols-2 gap-4"><QueueWidget/><JobStreamPanel/></div>
  </main>)
}
