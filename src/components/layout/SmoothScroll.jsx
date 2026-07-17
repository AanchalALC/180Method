import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/lib/useReducedMotion'

/* Lenis smooth scroll.
   Skipped entirely under prefers-reduced-motion — hijacking the scroll of
   someone who asked for less motion is exactly the wrong move. Also skipped
   for touch devices by default (`smoothTouch: false`), because native
   momentum scrolling on phones is better than anything we'd emulate. */
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reduced])

  return children
}
