'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface Photo {
  src: string
  caption?: string
}

interface GalleryStackProps {
  photos: Photo[]
}

export default function GalleryStack({ photos }: GalleryStackProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => setSelected((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(
    () => setSelected((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)),
    [photos.length]
  )

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-col" style={{ gap: '6px' }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative w-full overflow-hidden group cursor-pointer"
            style={{ height: 'clamp(300px, 40vw, 480px)' }}
            onClick={() => setSelected(i)}
          >
            <Image
              src={photo.src}
              alt={`Foto ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
              sizes="100vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {/* Caption */}
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
