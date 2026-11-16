import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { links, site } from '@/data/site'
import { WhatsAppIcon } from './Navbar'

function SocialLink({ href, label, description, className, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}${description ? `, ${description}` : ''} (opens in a new tab)`}
      className={`group relative grid h-11 w-11 place-items-center rounded-l-2xl text-white shadow-lg transition-transform duration-300 hover:-translate-x-1 sm:h-12 sm:w-12 ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-fluid-xs text-paper opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {description || label}
      </span>
    </a>
  )
}

export default function StickySocials() {
  return (
    <nav
      aria-label="180 Method social links"
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2"
    >
      <ul className="flex flex-col gap-2">
        <li>
          <SocialLink
            href={links.whatsapp}
            label="WhatsApp"
            description={site.phoneDisplay}
            className="bg-[#25D366] hover:bg-[#128C7E]"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href={links.instagram}
            label="Instagram"
            className="bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href={links.linkedin}
            label="LinkedIn"
            className="bg-[#0A66C2] hover:bg-[#004182]"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href={links.youtube}
            label="YouTube"
            className="bg-[#FF0000] hover:bg-[#CC0000]"
          >
            <Youtube className="h-5 w-5" aria-hidden="true" />
          </SocialLink>
        </li>
      </ul>
    </nav>
  )
}
