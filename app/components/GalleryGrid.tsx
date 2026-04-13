'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface Photo {
  src: string
  caption?: string
}

interface GalleryGridProps {
  photos: Photo[]
}

// Grid positions for up to 6 photos (3 col × 3 row)
const GRID_POSITIONS: React.CSSProperties[] = [
  { gridColumn: '1', gridRow: '1 / 3' },         // foto 1: col 1, righe 1-2
  { gridColumn: '2', gridRow: '1' },               // foto 2: col 2, riga 1
  { gridColumn: '3', gridRow: '1' },               // foto 3: col 3, riga 1
  { gridColumn: '2 / 4', gridRow: '2' },           // foto 4: col 2-3, riga 2
  { gridColumn: '1 / 3', gridRow: '3' },           // foto 5: col 1-2, riga 3
  { gridColumn: '3', gridRow: '3' },               // foto 6: col 3, riga 3
]

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => setSelected((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(
    () => setSelected((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)),
    [photos.length]
  )

  // Calculate grid rows based on number of photos
  const rows = photos.length <= 4 ? '320px 220px' : '320px 220px 260px'

  return (
    <>
      {/* Desktop grid */}
      <div
        className="hidden md:grid max-w-5xl mx-auto"
        style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: rows, gap: '10px' }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden group cursor-pointer"
            style={{ ...GRID_POSITIONS[i], borderRadius: '3px' }}
            onClick={() => setSelected(i)}
          >
            <Image
              src={photo.src}
              alt={`Foto ${i + 1}`}
              fill
              className="object-cover"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {photo.caption && (
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className="text-white/40"
                  style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  {photo.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile colonna singola */}
      <div className="md:hidden max-w-5xl mx-auto flex flex-col" style={{ gap: '10px' }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden group cursor-pointer"
            style={{ height: '260px', borderRadius: '3px' }}
            onClick={() => setSelected(i)}
          >
            <Image
              src={photo.src}
              alt={`Foto ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {photo.caption && (
              <div className="absolute bottom-3 left-3 z-10">
                <span
                  className="text-white/40"
                  style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  {photo.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        src={selected !== null ? photos[selected].src : ''}
        alt={selected !== null ? `Foto ${selected + 1}` : ''}
        isOpen={selected !== null}
        onClose={close}
        onPrev={prev}
        onNext={next}
        hasPrev={selected !== null && selected > 0}
        hasNext={selected !== null && selected < photos.length - 1}
      />
    </>
  )
}
