export type Photo = {
  src: string
  subject?: string
}

export type PortfolioItem = {
  slug: string
  client: string
  tag: string
  shortDesc: string
  fullDesc: string
  photos: Photo[]
}

export const portfolio: PortfolioItem[] = [
  {
    slug: 'hypermoto',
    client: 'Hypermoto',
    tag: 'Piano editoriale',
    shortDesc: 'Piano editoriale + produzione continuativa.',
    fullDesc:
      "Ogni contenuto costruisce percezione prima che il cliente arrivi in sede. Due esemplari, due linguaggi visivi, un\u2019unica identit\u00e0 riconoscibile.",
    photos: [
      { src: '/images/portfolio/hypermoto/01.jpg', subject: 'Superveloce 1000 Serie Oro' },
      { src: '/images/portfolio/hypermoto/02.jpg', subject: 'Superveloce 1000 Serie Oro' },
      { src: '/images/portfolio/hypermoto/03.jpg', subject: 'Superveloce 1000 Serie Oro' },
      { src: '/images/portfolio/hypermoto/04.jpg', subject: 'Superveloce 1000 Serie Oro' },
      { src: '/images/portfolio/hypermoto/05.jpg', subject: 'Superveloce 1000 Serie Oro' },
      { src: '/images/portfolio/hypermoto/06.jpg', subject: 'Streetfighter x Supreme' },
      { src: '/images/portfolio/hypermoto/07.jpg', subject: 'Streetfighter x Supreme' },
      { src: '/images/portfolio/hypermoto/08.jpg', subject: 'Streetfighter x Supreme' },
      { src: '/images/portfolio/hypermoto/09.jpg', subject: 'Streetfighter x Supreme' },
      { src: '/images/portfolio/hypermoto/10.jpg', subject: 'Streetfighter x Supreme' },
    ],
  },
  // BACKUP — MotoPerformance (nascosto, foto non ancora caricate)
  // {
  //   slug: 'motoperformance',
  //   client: 'MotoPerformance',
  //   tag: 'Shooting singolo',
  //   shortDesc: 'Shooting singolo monotematico.',
  //   fullDesc:
  //     'Un soggetto, nove angolazioni, una storia completa. Ogni fotografia è pensata per trasmettere la passione e la dedizione con cui lavorano.',
  //   photos: [
  //     { src: '/images/portfolio/motoperformance/01.jpg' },
  //     { src: '/images/portfolio/motoperformance/02.jpg' },
  //     { src: '/images/portfolio/motoperformance/03.jpg' },
  //     { src: '/images/portfolio/motoperformance/04.jpg' },
  //     { src: '/images/portfolio/motoperformance/05.jpg' },
  //     { src: '/images/portfolio/motoperformance/06.jpg' },
  //     { src: '/images/portfolio/motoperformance/07.jpg' },
  //     { src: '/images/portfolio/motoperformance/08.jpg' },
  //     { src: '/images/portfolio/motoperformance/09.jpg' },
  //   ],
  // },
  {
    slug: 'motoargento',
    client: 'MotoArgento',
    tag: 'Profilo + storytelling',
    shortDesc: 'Profilo riscritto da zero.',
    fullDesc:
      'Feed coerente, contenuti premium, storytelling che posiziona il brand sopra la concorrenza locale. Due esemplari, un posizionamento unico.',
    photos: [
      { src: '/images/portfolio/motoargento/01.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/02.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/03.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/04.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/05.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/06.jpg', subject: 'Panigale x Lamborghini' },
      { src: '/images/portfolio/motoargento/07.jpg', subject: 'KTM RC8C' },
      { src: '/images/portfolio/motoargento/08.jpg', subject: 'KTM RC8C' },
      { src: '/images/portfolio/motoargento/09.jpg', subject: 'KTM RC8C' },
      { src: '/images/portfolio/motoargento/10.jpg', subject: 'KTM RC8C' },
    ],
  },
]

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug)
}
