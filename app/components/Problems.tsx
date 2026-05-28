import { siteContent } from '../lib/content'

const { problems } = siteContent

export default function Problems() {
  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            {problems.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            {problems.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.items.map((truth) => (
            <div
              key={truth.number}
              className="bg-[#111111] border border-white/5 rounded-2xl p-7 hover:border-white/10 transition-colors duration-300"
            >
              <span className="text-white/20 text-xs font-bold tracking-widest">
                {truth.number}
              </span>
              <h3 className="mt-4 mb-3 text-base font-semibold text-white leading-snug">
                {truth.headline}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{truth.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
