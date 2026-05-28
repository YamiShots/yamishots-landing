import { siteContent } from '../lib/content'

const { method } = siteContent

export default function Method() {
  return (
    <section id="method" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            {method.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">{method.title}</h2>
          <p className="mt-3 text-zinc-500 text-lg">{method.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          {method.steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111111] border border-accent/20 mb-6">
                <span className="text-accent font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
