/* Shared Lenis instance. SmoothScroll sets it; ScrollToTop reads it so it can
   reset the SMOOTH scroll position on route change (window.scrollTo alone can't,
   because Lenis owns the scroll while it's active). */
export let lenisInstance = null
export const setLenis = (instance) => { lenisInstance = instance }