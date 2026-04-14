import Link from 'next/link'
import { WA_LINK } from '@/app/lib/constants'
import GalleryStack from '@/app/components/GalleryStack'
import GalleryGrid from '@/app/components/GalleryGrid'

const panigalePhotos = [
  { src: '/images/portfolio/motoargento/01.jpg', caption: 'QUANDO IL COLORE \u00C8 GI\u00C0 UN MESSAGGIO' },
  { src: '/images/portfolio/motoargento/02.jpg', caption: 'LAMBORGHINI NON \u00C8 UN DETTAGLIO. \u00C8 IL PUNTO' },
  { src: '/images/portfolio/motoargento/03.jpg', caption: 'LA COLLABORAZIONE CHE GIUSTIFICA IL PREZZO' },
  { src: '/images/portfolio/motoargento/04.jpg', caption: 'OGNI SCATTO COSTRUISCE UN POSIZIONAMENTO' },
  { src: '/images/portfolio/motoargento/05.jpg', caption: 'IL FEED CHE I CLIENTI GIUSTI NOTANO' },
  { src: '/images/portfolio/motoargento/06.jpg', caption: 'NON UNA MOTO. UN OGGETTO DI DESIDERIO' },
]

const ktmPhotos = [
  { src: '/images/portfolio/motoargento/07.jpg', caption: 'LA BESTIA CHE NON HA BISOGNO DI PRESENTAZIONI' },
  { src: '/images/portfolio/motoargento/08.jpg', caption: 'ANGOLI CHE NESSUN COMPETITOR HA IL CORAGGIO DI MOSTRARE' },
  { src: '/images/portfolio/motoargento/09.jpg', caption: 'RC8C: IL CONTENUTO CHE FILTRA IL CLIENTE' },
  { src: '/images/portfolio/motoargento/10.jpg', caption: 'QUANDO LA MOTO PARLA E IL BRAND ASCOLTA' },
]

const reels = [
  {
    src: '/videos/motoargento/reel-1.mp4',
    poster: '/videos/motoargento/reel-1-poster.jpg',
    caption: 'Non un post. Una dichiarazione di posizionamento che rimane.',
  },
  {
    src: '/videos/motoargento/reel-2.mp4',
    poster: '/videos/motoargento/reel-2-poster.jpg',
    caption: 'Feed coerente significa che ogni nuovo follower capisce subito chi sei.',
  },
  {
    src: '/videos/motoargento/reel-3.mp4',
    poster: '/videos/motoargento/reel-3-poster.jpg',
    caption: 'Il cliente premium non tratta sul prezzo se il profilo lo convince prima.',
  },
  {
    src: '/videos/motoargento/reel-4.mp4',
    poster: '/videos/motoargento/reel-4-poster.jpg',
    caption: 'Storytelling che trasforma un acquisto in un\u2019esperienza attesa.',
  },
  // Aggiungere i file in public/videos/motoargento/ e i poster corrispondenti
]

export const metadata = {
  title: 'MotoArgento \u2013 YamiShots',
  description:
    'Profilo riscritto da zero per MotoArgento. Feed coerente, identit\u00e0 visiva e storytelling che posiziona sopra la concorrenza locale.',
}

export default function MotoargentoPage() {
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
          Profilo + storytelling
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
          Un brand locale che smette di sembrare locale.
        </h1>
        <p className="mt-6 text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
          MotoArgento lavora bene. Il problema era che non si vedeva. Feed riscritto da zero,
          identit&agrave; visiva coerente, storytelling che posiziona sopra la concorrenza locale.
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
              'Feed Instagram generico, intercambiabile con qualsiasi concorrente della zona.',
              'Foto belle ma senza filo narrativo: contenuti che non costruivano brand.',
              'Prezzi percepiti come trattabili perché la comunicazione non giustificava il valore.',
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
            Quello che abbiamo costruito.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reels.map((reel, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
                  <video
                    src={reel.src}
                    poster={reel.poster}
                    controls
                    preload="none"
                    playsInline
                    className="w-full aspect-square object-contain bg-black"
                  />
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed px-1">{reel.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERIA PANIGALE */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto mb-10">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Galleria
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
            Panigale V4 Lamborghini
          </h2>
        </div>
        <GalleryStack photos={panigalePhotos} />
      </section>

      {/* 5. GALLERIA KTM */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto mb-10">
          <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
            Galleria
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
            KTM RC8C
          </h2>
        </div>
        <GalleryGrid photos={ktmPhotos} />
      </section>

      {/* 6. RISULTATO */}
      <section className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="bg-[#111111] border border-white/5 rounded-2xl px-10 py-8 text-center max-w-lg w-full">
            <span className="text-[11px] font-medium tracking-[0.15em] text-[#888888] uppercase">
              Risultato
            </span>
            <p className="mt-4 text-white text-lg font-semibold leading-relaxed">
              Brand riposizionato
              <span className="text-[#444444] mx-3">·</span>
              Concorrenza locale superata
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
          Il tuo brand può raccontare qualcosa di più.
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
