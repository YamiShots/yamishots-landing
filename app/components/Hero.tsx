'use client'

import { siteContent, getWaLink } from '../lib/content'

const { hero } = siteContent
const WA_LINK = getWaLink(siteContent)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden bg-[#0a0a0a]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.bgImage}
        alt="YamiShots hero"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.80) 100%)' }}
      />

      <div className="relative z-[2] max-w-4xl mx-auto text-center">
        <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase mb-8">
          <span className="w-4 h-px bg-[#888888]" />
          {hero.eyebrow}
          <span className="w-4 h-px bg-[#888888]" />
        </p>

        {/* Headline — fluid, no hardcoded <br> */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-6">
          <span className="text-white block">{hero.headline}</span>
          <span className="text-white/40 block">{hero.headlineFaded}</span>
        </h1>

        {/* Subtext — wraps naturally */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subtext}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-px shadow-lg shadow-accent/20"
          >
            <WhatsAppIcon />
            {hero.cta1}
          </a>
          <a
            href="#works"
            className="inline-flex items-center justify-center gap-2 text-white border border-[#333333] hover:border-accent hover:text-accent px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            {hero.cta2}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[13px] text-[#aaaaaa] tracking-[0.05em]">
          {hero.socialProof.map((name, i) => (
            <span key={name} className="flex items-center gap-3">
              {i > 0 && <span className="text-[#444]">|</span>}
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-[#555]">
        <span className="text-[10px] uppercase tracking-widest">Scorri</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent" />
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
