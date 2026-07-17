import { Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'

import Layout from '@/components/layout/Layout'
import ScrollToTop from '@/components/layout/ScrollToTop'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { legacyRedirects } from '@/data/site'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Team from '@/pages/Team'
import Counselling from '@/pages/Counselling'
import Reviews from '@/pages/Reviews'
import Faqs from '@/pages/Faqs'
import MediaFeatures from '@/pages/MediaFeatures'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    /* reducedMotion="user" makes EVERY framer animation in the tree respect the
       OS setting automatically. It is why individual components don't each
       need their own check. */
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="team" element={<Team />} />
            <Route path="counselling" element={<Counselling />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="media-features" element={<MediaFeatures />} />
            <Route path="contact" element={<Contact />} />

            {/* Old WordPress URLs. These are live and indexed today, so they
                must never 404. Handled at the CDN too (public/_redirects) —
                this is the client-side safety net. */}
            {legacyRedirects.map(({ from, to }) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </MotionConfig>
  )
}
