// ─── CaseStudies.tsx ───────────────────────────────────────────────────────
import Link from 'next/link'
import Image from 'next/image'
import { siteContent } from '../lib/content'

const { caseStudies } = siteContent

export default function CaseStudies() {
  return (
    <section id="works" className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            {caseStudies.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            {caseStudies.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.cases.map((c) => (
            <Link
              key={c.client}
              href={`/portfolio/${c.slug}`}
              className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 hover:scale-[1.02] transition-all duration-300 block"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={c.image} alt={c.client} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-md">{c.tag}</span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-white/10 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md">Vedi lavori →</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">{c.client}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{c.description}</p>
                <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {c.result}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
