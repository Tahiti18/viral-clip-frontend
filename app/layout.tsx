
import '../app/globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
export const metadata = { title: 'UnityLab', description: 'Viral Clip — Control' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="en"><body><Nav/><div className="container py-6">{children}</div><Footer/></body></html>)
}
