import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Galerie",
  description: "Revivez les meilleurs moments de SenCamCong en concert : photos, videos et coulisses.",
}

import BackgroundImage from '@/components/BackgroundImage'
import GalleryGrid from '@/components/GalleryGrid'
import { client } from '@/sanity/client'
import { GALERIE_QUERY } from '@/sanity/queries'

export default async function GaleriePage() {
  const images = await client.fetch(GALERIE_QUERY)

  const fallbackImages = [
    { _id: "1", titre: "Concert Olympia", date: "2026", description: "Salle comble à Paris" },
    { _id: "2", titre: "Studio Enregistrement", date: "2026", description: "Nouvel album en préparation" },
    { _id: "3", titre: "Festival Afrobeat", date: "2025", description: "Performance mémorable" },
    { _id: "4", titre: "Session Acoustique", date: "2025", description: "Intimité et émotion" },
    { _id: "5", titre: "Tournée Africaine", date: "2025", description: "Dakar, Douala, Kinshasa" },
    { _id: "6", titre: "Backstage", date: "2025", description: "Moments de préparation" }
  ]

  const imagesToShow = images.length > 0 ? images : fallbackImages

  return (
    <div className="bg-black min-h-screen">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <BackgroundImage
          section="galerie"
          overlayOpacity="bg-gradient-to-b from-black/60 via-black/40 to-black/80"
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1600 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000000'/%3E%3Cstop offset='50%25' stop-color='%231a0000'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill-opacity='0.1'%3E%3Ccircle cx='400' cy='250' r='160' fill='%23ef4444'/%3E%3Ccircle cx='1200' cy='650' r='240' fill='%23ef4444'/%3E%3Ccircle cx='600' cy='350' r='100' fill='%23ef4444'/%3E%3Ccircle cx='1000' cy='550' r='140' fill='%23ef4444'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          }
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex gap-3 mb-6">
            <div className="w-16 md:w-24 h-1 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-16 md:w-24 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 md:w-24 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">Galerie</h1>
          <p className="text-lg md:text-2xl text-gray-200 drop-shadow-lg">Nos meilleurs moments capturés</p>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 pb-24 md:pb-12">
        <GalleryGrid images={imagesToShow} />
      </main>
    </div>
  )
}

export const revalidate = 60