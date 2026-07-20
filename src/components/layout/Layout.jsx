import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

/* Every route renders inside this. One navbar, one footer, always.
   ScrollToTop resets scroll on every route change (it renders nothing) — without
   it, React Router preserves the previous scroll offset and deep-linked pages
   like /team/:slug open mid-page instead of at their hero. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}