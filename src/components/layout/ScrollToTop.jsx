import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { lenisInstance } from '@/lib/lenis'

/* React Router keeps scroll position across route changes by default, which
   means clicking a card can land you mid-page. This resets it — unless the URL
   has a #hash, in which case we let the browser (or Lenis) find the anchor.

   IMPORTANT: while Lenis is active it OWNS the scroll, so window.scrollTo(0) is
   ignored and the page opens at its old offset. So we reset Lenis directly
   (immediate: true = jump, no animation) and only fall back to window.scrollTo
   when Lenis isn't running (reduced-motion / touch). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenisInstance) lenisInstance.scrollTo(el, { offset: 0 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}