import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/* Every route renders inside this. One navbar, one footer, always. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
