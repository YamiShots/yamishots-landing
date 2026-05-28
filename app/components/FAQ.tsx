'use client'

import { useState } from 'react'
import { siteContent } from '../lib/content'

const { faq } = siteContent

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            {faq.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">{faq.title}</h2>
        </div>

        <div className="space-y-2">
          {faq.items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                open === i ? 'border-white/12 bg-[#111111]' : 'border-white/5 bg-[#0d0d0d]'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-start justify-between gap-4 px-6 py-5"
              >
                <span className={`font-medium text-sm md:text-base transition-colors ${open === i ? 'text-white' : 'text-zinc-300'}`}>
                  {item.q}
                </span>
                <svg
                  className={`flex-shrink-0 mt-0.5 text-zinc-500 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-60' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
