'use client'

import { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
  _id: string
  titre: string
  date: string
  description: string
  image?: { asset?: { url?: string } }
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const close = useCallback(() => setSelectedIndex(null), [])

  const showPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const showNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (selectedIndex === null) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [selectedIndex, close, showPrev, showNext])

  const selected = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image._id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-square bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-red-500/60 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left cursor-zoom-in"
          >
            {image.image?.asset?.url ? (
              <img
                src={image.image.asset.url}
                alt={image.titre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Image {index + 1}</p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-white mb-1 line-clamp-1">{image.titre}</h3>
              <p className="text-red-400 text-xs md:text-sm font-medium mb-1 md:mb-2">{image.date}</p>
              <p className="hidden md:block text-gray-300 text-sm">{image.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev() }}
                aria-label="Image précédente"
                className="absolute left-2 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext() }}
                aria-label="Image suivante"
                className="absolute right-2 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image?.asset?.url ? (
              <img
                src={selected.image.asset.url}
                alt={selected.titre}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="mt-4 text-center px-4">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selected.titre}</h3>
              <p className="text-red-400 text-sm font-medium mb-1">{selected.date}</p>
              <p className="text-gray-400 text-sm">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}