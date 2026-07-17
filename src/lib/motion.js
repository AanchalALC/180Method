/* Shared Framer Motion variants + easing.
   Every animation on the site pulls from here so the timing feels like one
   hand made it, and so we only ever animate transform/opacity — which are GPU
   composited. (Audit PF8 flagged a non-composited animation on the live site.) */

export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/* Words, not characters — character-splitting a headline wrecks it for screen
   readers and breaks text selection. */
export const wordReveal = {
  hidden: { opacity: 0, y: '0.35em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const viewport = { once: true, margin: '0px 0px -12% 0px' }
