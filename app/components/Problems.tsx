const truths = [
  {
    number: '01',
    headline: 'Il tuo profilo dice che sei uno qualunque.',
    body: 'Anche se hai anni di esperienza. Anche se chi ti conosce ti consiglia a terzi. Anche se quello che fai in officina o in showroom vale molto più di quello che comunichi.',
  },
  {
    number: '02',
    headline: 'Online non conta quello che sai fare.',
    body: 'Conta quello che riesci a far percepire. Il tuo competitor che magari lavora peggio di te ha un feed curato e porta a casa i clienti che dovresti avere tu.',
  },
  {
    number: '03',
    headline: 'Il prezzo diventa l\'unica leva che hai.',
    body: 'I clienti che spendono senza discutere scelgono chi comunica meglio. Sempre. Anche se il tuo lavoro è superiore. Ogni mese con contenuti mediocri è margine lasciato sul tavolo.',
  },
]

export default function Problems() {
  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Parliamoci chiaro
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Verità scomode.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {truths.map((truth) => (
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
