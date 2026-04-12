const consequences = [
  'Lavori a tariffe più basse di quanto meriti',
  'Perdi clienti premium a favore di chi comunica meglio',
  'Sprechi tempo a trattare invece di costruire il brand',
  'Ogni mese di contenuti mediocri è margine lasciato sul tavolo',
]

export default function Costs() {
  return (
    <section className="py-28 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
          Il costo reale
        </span>

        <h2 className="mt-4 mb-16 text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          Cosa ti costa davvero
          <br />
          comunicare male.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: copy */}
          <div className="space-y-5">
            <p className="text-white text-lg font-medium leading-relaxed">
              Non è una questione estetica.{' '}
              <span className="text-zinc-400">È economica.</span>
            </p>
            <p className="text-zinc-500 leading-relaxed">
              Quando la tua vetrina digitale non regge il confronto, il prezzo
              diventa l&apos;unica leva che hai. Scendi. Tratti. Cedi.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              I clienti che spendono senza discutere — quelli che cercano
              qualità, non il risparmio — scelgono chi comunica meglio.{' '}
              <span className="text-zinc-300">Sempre.</span> Anche se il tuo
              lavoro è superiore.
            </p>
          </div>

          {/* Right: consequences */}
          <div className="flex flex-col gap-3">
            {consequences.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-zinc-900 border border-white/5 rounded-xl p-4"
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
