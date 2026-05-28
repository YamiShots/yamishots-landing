import { siteContent } from '../lib/content'

const { costs } = siteContent

export default function Costs() {
  return (
    <section className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
          {costs.eyebrow}
        </span>

        <h2 className="mt-4 mb-16 text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          {costs.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-5">
            <p className="text-white text-lg font-medium leading-relaxed">
              {costs.body1Bold}{' '}
              <span className="text-zinc-400">{costs.body1Muted}</span>
            </p>
            <p className="text-zinc-500 leading-relaxed">{costs.body2}</p>
            <p className="text-zinc-500 leading-relaxed">
              {costs.body3}{' '}
              <span className="text-zinc-300">{costs.body3Emphasis}</span>{' '}
              {costs.body3Suffix}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {costs.consequences.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#111111] border border-white/5 rounded-xl p-4"
              >
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
