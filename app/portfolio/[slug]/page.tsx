import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPortfolioItem, portfolio } from '@/app/lib/portfolio'
import { WA_LINK } from '@/app/lib/constants'
import Slideshow from './Slideshow'

export function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getPortfolioItem(slug)
  if (!item) return {}
  return {
    title: `${item.client} – YamiShots`,
    description: item.shortDesc,
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getPortfolioItem(slug)
  if (!item) notFound()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">
            Yami<span className="text-accent">Shots</span>
          </Link>
          <Link
            href="/#works"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Tutti i lavori
          </Link>
        </div>
      </header>

      {/* Hero text */}
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-8">
        <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
          {item.tag}
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
          {item.client}
        </h1>
        <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
          {item.fullDesc}
        </p>
      </div>

      {/* Slideshow */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <Slideshow photos={item.photos} client={item.client} />
      </div>

      {/* CTA */}
      <div className="border-t border-white/5 py-24 px-6 text-center">
        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
          Vuoi lo stesso risultato?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Parliamo del tuo progetto.
        </h2>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-accent/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Scrivimi su WhatsApp
        </a>
      </div>
    </div>
  )
}
