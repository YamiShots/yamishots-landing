import { siteContent, getWaLink } from '../lib/content'

const { nav, footer } = siteContent
const WA_LINK = getWaLink(siteContent)

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="text-white font-bold text-lg tracking-tight">
            Yami<span className="text-accent">Shots</span>
          </a>
          <p className="text-zinc-700 text-xs mt-1">{footer.tagline}</p>
        </div>

        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent transition-colors">
            {footer.waLabel}
          </a>
          <span className="text-zinc-800 text-xs">{footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
