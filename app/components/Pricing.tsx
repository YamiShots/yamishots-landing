import { WA_LINK } from '../lib/constants'

const plans = [
  {
    name: 'Shooting Singolo',
    price: '€300',
    priceNote: 'a partire da',
    description:
      'Per alzare subito la percezione e fare ordine nella tua vetrina digitale.',
    features: [
      'Produzione in sede (foto + video)',
      'Reels + foto + cover pronte per IG',
      '1 revisione inclusa',
    ],
    cta: 'Prenota ora',
    highlighted: false,
  },
  {
    name: 'Piano Mensile',
    price: '€800',
    priceNote: 'al mese',
    description:
      'Per crescere con costanza e mantenere uno standard premium ogni settimana.',
    features: [
      '1/2 shooting al mese',
      'Format replicabili: processo, dettagli, stock',
      'Giriamo. Consegno. Pubblichi.',
    ],
    cta: 'Richiedi disponibilità',
    highlighted: true,
    badge: 'Più scelto',
  },
  {
    name: 'Progetto Custom',
    price: 'Su misura',
    priceNote: 'preventivo gratuito',
    description:
      'Trailer, evento, storytelling o showroom: quando serve il massimo impatto.',
    features: [
      'Concept + Moodboard',
      'Shooting + b-roll premium',
      'Montaggio + color + sound design',
    ],
    cta: 'Contattami per info',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
            Prezzi
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Scegli da dove vuoi iniziare.
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md mx-auto text-sm">
            Non sai da dove partire? Scrivimi e ti indico il percorso più adatto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? 'bg-amber-500/8 border-2 border-amber-500/35'
                  : 'bg-zinc-900 border border-white/5'
              }`}
            >
              {plan.highlighted && 'badge' in plan && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-white text-4xl font-bold">{plan.price}</span>
                <p className="text-zinc-600 text-xs mt-1">{plan.priceNote}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-zinc-400"
                  >
                    <svg
                      className="mt-0.5 flex-shrink-0 text-amber-500"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/8'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
