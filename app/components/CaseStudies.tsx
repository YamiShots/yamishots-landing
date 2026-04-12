// To add your images:
// 1. Place files in /public/images/ (e.g. case-hypermoto.jpg)
// 2. Uncomment the next/image import and Image usage below
// import Image from 'next/image'

const cases = [
  {
    client: 'Hypermoto',
    tag: 'Piano editoriale',
    description:
      'Piano editoriale + produzione continuativa. Ogni contenuto costruisce percezione prima che il cliente arrivi in sede.',
    result: 'Profilo riposizionato in 60 giorni',
    image: '/images/case-hypermoto.jpg',
    color: 'from-zinc-800 to-zinc-900',
  },
  {
    client: 'MotoPerformance',
    tag: 'Shooting singolo',
    description:
      'Shooting singolo. Ogni fotografia è pensata per trasmettere la passione e dedizione con cui lavorano.',
    result: 'Identità visiva coerente',
    image: '/images/case-motoperformance.jpg',
    color: 'from-zinc-800 to-zinc-900',
  },
  {
    client: 'MotoArgento',
    tag: 'Profilo + storytelling',
    description:
      'Profilo riscritto da zero. Feed coerente, contenuti premium, storytelling che posiziona il brand sopra la concorrenza locale.',
    result: 'Brand sopra la concorrenza locale',
    image: '/images/case-motoargento.jpg',
    color: 'from-zinc-800 to-zinc-900',
  },
]

export default function CaseStudies() {
  return (
    <section id="works" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
            Risultati reali
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Chi ha già scelto di
            <br />
            comunicare meglio.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.client}
              className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300"
            >
              {/* Image area */}
              <div className="relative h-52 overflow-hidden">
                {/* Placeholder — replace with <Image> when you have the photos */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.color} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-zinc-600 text-sm font-medium">{c.client}</span>
                </div>
                {/*
                  UNCOMMENT when image is ready:
                  <Image
                    src={c.image}
                    alt={c.client}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-md">
                    {c.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">{c.client}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {c.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
