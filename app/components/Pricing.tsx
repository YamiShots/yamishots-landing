import { siteContent, getWaLink } from '../lib/content'

const { pricing } = siteContent
const WA_LINK = getWaLink(siteContent)

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            {pricing.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">{pricing.title}</h2>
          <p className="mt-4 text-zinc-500 max-w-md mx-auto text-sm">{pricing.note}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlighted
                  ? 'bg-accent/8 border-2 border-accent/35'
                  : 'bg-zinc-900 border border-white/5'
              }`}
            >
              {plan.highlighted && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-white text-4xl font-bold">{plan.price}</span>
                <p className="text-zinc-600 text-xs mt-1">{plan.priceNote}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <svg className="mt-0.5 flex-shrink-0 text-accent" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                    ? 'bg-accent hover:bg-accent-hover text-white'
                    : 'bg-transparent hover:bg-white/5 text-white border border-[#333333] hover:border-accent'
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
