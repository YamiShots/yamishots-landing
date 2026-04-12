import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'YamiShots – Il tuo livello è alto. La tua vetrina no.',
  description:
    'Fotografia e video professionali per officine, preparatori, concessionari e showroom nel mondo moto e auto. Alza la percezione del tuo brand.',
  openGraph: {
    title: 'YamiShots – Il tuo livello è alto. La tua vetrina no.',
    description:
      'Fotografia e video per il mondo moto e auto. Smetti di comunicare come tutti gli altri.',
    type: 'website',
    locale: 'it_IT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
