import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/lib/useReducedMotion'
import { setLenis } from '@/lib/lenis'

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
    setLenis(lenis)               // ← share it

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)              // ← clear on unmount
    }
  }, [reduced])

  return children
}