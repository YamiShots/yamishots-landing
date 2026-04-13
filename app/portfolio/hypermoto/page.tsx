import Image from 'next/image'
import Link from 'next/link'
import { WA_LINK } from '@/app/lib/constants'

const superveloce = [
  '/images/portfolio/hypermoto/01.jpg',
  '/images/portfolio/hypermoto/02.jpg',
  '/images/portfolio/hypermoto/03.jpg',
  '/images/portfolio/hypermoto/04.jpg',
  '/images/portfolio/hypermoto/05.jpg',
]

const streetfighter = [
  '/images/portfolio/hypermoto/06.jpg',
  '/images/portfolio/hypermoto/07.jpg',
  '/images/portfolio/hypermoto/08.jpg',
  '/images/portfolio/hypermoto/09.jpg',
  '/images/portfolio/hypermoto/10.jpg',
]

const supervelocceCaptions = [
  'IL DETTAGLIO CHE GIUSTIFICA IL PREZZO',
  'FORMA E FUNZIONE COME UN UNICO LINGUAGGIO',
  'OGNI ANGOLO RACCONTA UNA SCELTA DI STILE',
  'PRODUZIONE CHE COSTRUISCE PERCEZIONE',
  'L\u2019IDENTIT\u00C0 VISIVA INIZIA QUI',
]

const streetfighterCaptions = [
  'UNA COLLABORAZIONE CHE SI VEDE',
  'STREETFIGHTER. NIENT\u2019ALTRO DA AGGIUNGERE',
  'IL BRAND COME ESTENSIONE DELLA MOTO',
  'CONTENUTO CHE POSIZIONA PRIMA ANCORA DI VENDERE',
  'QUANDO LA MOTO PARLA DA SOLA',
]

const reels = [
  {
    src: '/videos/hypermoto/reel-1.mp4',
    caption: 'Non mostra la moto. Costruisce il desiderio di averla.',
  },
  {
    src: '/videos/hypermoto/reel-2.mp4',
    caption: 'Il processo raccontato diventa prova di qualit\u00e0.',
  },
  // reel-3 e reel-4 da aggiungere
]

export const metadata = {
  title: 'Hypermoto \u2013 YamiShots',
  description:
    'Piano editoriale continuativo per Hypermoto. Da vetrina digitale generica a profilo premium riconoscibile.',
}

export default function HypermotoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">
            Yami<span className="text-accent">Shots</span>
          </Link>
          <Link
            href="/#works"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Tutti i lavori
          </Link>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20">
        <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
          Piano editoriale continuativo
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
          Quando ogni contenuto lavora per te anche quando sei in officina.
        </h1>
        <p className="mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
          Hypermoto aveva un prodotto premium e una vetrina digitale che non lo comunicava.
          Abbiamo cambiato questo.
        </p>
      </section>

      {/* 2. IL PROBLEMA */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Il problema
          </span>
          <h2 className="mt-4 mb-10 text-2xl md:text-3xl font-bold text-white">
            Da dove siamo partiti.
          </h2>
          <ul className="space-y-5">
            {[
              'Profilo Instagram discontinuo, nessuna identità visiva coerente.',
              'Contenuti che mostravano la moto ma non costruivano desiderio.',
              'Clienti premium che arrivavano in sede già convinti da altri.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <p className="text-zinc-300 text-base leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. I CONTENUTI — Video locali */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            I contenuti
          </span>
          <h2 className="mt-4 mb-10 text-2xl md:text-3xl font-bold text-white">
            Quello che abbiamo prodotto.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reels.map((reel, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
                  <video
                    src={reel.src}
                    controls
                    preload="none"
                    playsInline
                    className="w-full aspect-[9/16] object-cover"
                  />
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed px-1">{reel.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERIA SUPERVELOCE — full-width stack */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto mb-10">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Galleria
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Superveloce 1000 Serie Oro
          </h2>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col" style={{ gap: '6px' }}>
          {superveloce.map((src, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden group"
              style={{ height: 'clamp(300px, 40vw, 480px)' }}
            >
              <Image
                src={src}
                alt={`Superveloce 1000 Serie Oro — ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className="text-white/40"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {supervelocceCaptions[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GALLERIA STREETFIGHTER — grid asimmetrica */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto mb-10">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Galleria
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Streetfighter V4 x Supreme
          </h2>
        </div>

        {/* Desktop grid — 5 foto su 6 posizioni, ultima cella vuota */}
        <div
          className="hidden md:grid max-w-5xl mx-auto"
          style={{
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '320px 220px 260px',
            gap: '10px',
          }}
        >
          {/* Foto 1: col 1, righe 1-2 */}
          <div className="relative overflow-hidden group" style={{ gridColumn: '1', gridRow: '1 / 3', borderRadius: '3px' }}>
            <Image src={streetfighter[0]} alt="Streetfighter 1" fill className="object-cover" sizes="40vw" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white/40" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {streetfighterCaptions[0]}
              </span>
            </div>
          </div>
          {/* Foto 2: col 2, riga 1 */}
          <div className="relative overflow-hidden group" style={{ gridColumn: '2', gridRow: '1', borderRadius: '3px' }}>
            <Image src={streetfighter[1]} alt="Streetfighter 2" fill className="object-cover" sizes="20vw" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
          </div>
          {/* Foto 3: col 3, riga 1 */}
          <div className="relative overflow-hidden group" style={{ gridColumn: '3', gridRow: '1', borderRadius: '3px' }}>
            <Image src={streetfighter[2]} alt="Streetfighter 3" fill className="object-cover" sizes="20vw" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
          </div>
          {/* Foto 4: col 2-3, riga 2 */}
          <div className="relative overflow-hidden group" style={{ gridColumn: '2 / 4', gridRow: '2', borderRadius: '3px' }}>
            <Image src={streetfighter[3]} alt="Streetfighter 4" fill className="object-cover" sizes="40vw" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
          </div>
          {/* Foto 5: col 1-2, riga 3 */}
          <div className="relative overflow-hidden group" style={{ gridColumn: '1 / 3', gridRow: '3', borderRadius: '3px' }}>
            <Image src={streetfighter[4]} alt="Streetfighter 5" fill className="object-cover" sizes="60vw" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white/40" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {streetfighterCaptions[4]}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: colonna singola */}
        <div className="md:hidden max-w-5xl mx-auto flex flex-col" style={{ gap: '10px' }}>
          {streetfighter.map((src, i) => (
            <div key={i} className="relative overflow-hidden" style={{ height: '260px', borderRadius: '3px' }}>
              <Image src={src} alt={`Streetfighter ${i + 1}`} fill className="object-cover" sizes="100vw" />
              <div className="absolute bottom-3 left-3">
                <span className="text-white/40" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {streetfighterCaptions[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RISULTATO */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="bg-[#111111] border border-white/5 rounded-2xl px-10 py-8 text-center max-w-lg w-full">
            <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
              Risultato
            </span>
            <p className="mt-4 text-white text-lg font-semibold leading-relaxed">
              Piano editoriale attivo
              <span className="text-[#444444] mx-3">·</span>
              Profilo riposizionato in 60 giorni
            </p>
          </div>
        </div>
      </section>

      {/* 7. CTA FINALE */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-center border-t border-white/5">
        <p className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase mb-4">
          Il prossimo
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Anche il tuo lavoro merita una vetrina così.
        </h2>
        <p className="text-zinc-500 text-base mb-10">Un messaggio. Nessun impegno.</p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-accent/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Scrivimi su WhatsApp
        </a>
      </section>
    </div>
  )
}
