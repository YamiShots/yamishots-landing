'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { Photo } from '@/app/lib/portfolio'

interface SlideshowProps {
  photos: Photo[]
  client: string
}

export default function Slideshow({ photos, client }: SlideshowProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1)),
    [photos.length]
  )
  const next = useCallback(
    () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1)),
    [photos.length]
  )

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const photo = photos[current]

  return (
    <div className="select-none">
      {/* Main slide area */}
      <div
        className="relative aspect-[4/3] md:aspect-[16/9] bg-zinc-900 rounded-2xl overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            width: `${photos.length * 100}%`,
            transform: `translateX(-${(current * 100) / photos.length}%)`,
          }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              className="relative h-full"
              style={{ width: `${100 / photos.length}%` }}
            >
              <Image
                src={p.src}
                alt={`${client} foto ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Subject badge */}
        {photo.subject && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {photo.subject}
            </span>
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full">
            {current + 1} / {photos.length}
          </span>
        </div>

        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          aria-label="Foto precedente"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          aria-label="Foto successiva"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Vai alla foto ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-5 h-1.5 bg-accent'
                : 'w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
