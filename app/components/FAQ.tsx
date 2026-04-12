'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '€300 per uno shooting sono tanti.',
    a: "Dipende come la guardi. Se uno shooting ben fatto ti fa chiudere anche solo un cliente premium in più — uno che paga senza trattare — si ripaga tre volte. Il vero costo è quello invisibile: mesi di contenuti mediocri che tengono lontano chi spende davvero.",
  },
  {
    q: 'Ho già qualcuno che mi fa le foto/video.',
    a: "Ottimo. Se stai crescendo e il tuo profilo comunica il tuo livello, non cambiare niente. Se sei qui, probabilmente qualcosa non torna. La differenza non è nelle foto: è in una strategia visiva coerente che costruisce percezione nel tempo.",
  },
  {
    q: 'Non ho tempo di gestire i social.',
    a: "Non devi. Il mio lavoro finisce con contenuti pronti da pubblicare — reels ottimizzati, foto già dimensionate. Tu carichi. Ci vogliono cinque minuti.",
  },
  {
    q: 'Non so se funziona per il mio settore.',
    a: "Lavoro esclusivamente con officine, preparatori, concessionari e showroom nel mondo moto e auto. Non è un servizio generico. È costruito su questo settore.",
  },
  {
    q: 'Devo metterci la faccia / parlare in camera?',
    a: "No. Posso costruire tutto attorno al lavoro, ai dettagli, ai mezzi. Il brand non sei per forza tu in camera — è il processo che mostri, l'attenzione che metti, il risultato che ottieni.",
  },
  {
    q: 'Prima voglio vedere i risultati.',
    a: "Giusto. Per questo esistono Hypermoto, MotoPerformance e MotoArgento. Guarda i loro profili. Se vedi qualcosa che ti convince, parliamoci.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Già so cosa
            <br />
            stai pensando.
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                open === i
                  ? 'border-white/12 bg-[#111111]'
                  : 'border-white/5 bg-[#0d0d0d]'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-start justify-between gap-4 px-6 py-5"
              >
                <span
                  className={`font-medium text-sm md:text-base transition-colors ${
                    open === i ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {faq.q}
                </span>
                <svg
                  className={`flex-shrink-0 mt-0.5 text-zinc-500 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  open === i ? 'max-h-60' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
