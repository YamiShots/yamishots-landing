import { WA_LINK } from '../lib/constants'

const navLinks = [
  { href: '#works', label: 'Lavori' },
  { href: '#method', label: 'Metodo' },
  { href: '#pricing', label: 'Prezzi' },
  { href: '#faq', label: 'FAQ' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <a href="#" className="text-white font-bold text-lg tracking-tight">
            Yami<span className="text-amber-500">Shots</span>
          </a>
          <p className="text-zinc-700 text-xs mt-1">
            Fotografia &amp; Video · Moto e Auto
          </p>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact + copyright */}
        <div className="flex items-center gap-5 text-sm">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-amber-500 transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-zinc-800 text-xs">© 2025 YamiShots</span>
        </div>
      </div>
    </footer>
  )
}
