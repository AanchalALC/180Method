import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* React Router keeps scroll position across route changes by default, which
   means clicking a nav link can land you mid-page. This resets it — unless the
   URL has a #hash, in which case we let the browser find the anchor. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
