import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Concerts",
  description: "Decouvrez les prochaines dates et concerts de SenCamCong.",
}

import ConcertCard from '@/components/ConcertCard'
import BackgroundImage from '@/components/BackgroundImage'
import { client } from '@/sanity/client'
import { CONCERTS_QUERY } from '@/sanity/queries'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678"

export default async function ConcertsPage() {
  const concerts = await client.fetch(CONCERTS_QUERY)

  return (
    <div className="bg-black min-h-screen">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <BackgroundImage
          section="concerts"
          overlayOpacity="bg-black/20"
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1600 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000000'/%3E%3Cstop offset='50%25' stop-color='%230a2e0a'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill-opacity='0.1'%3E%3Ccircle cx='200' cy='200' r='150' fill='%2322c55e'/%3E%3Ccircle cx='1400' cy='700' r='200' fill='%2322c55e'/%3E%3Ccircle cx='800' cy='450' r='100' fill='%2322c55e'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          }
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex gap-3 mb-6">
            <div className="w-16 md:w-24 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-16 md:w-24 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 md:w-24 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Concerts</h1>
          <p className="text-lg md:text-2xl text-gray-300">Nos prochaines dates et performances</p>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 pb-24 md:pb-12">
        {concerts.length > 0 ? (
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {concerts.map((concert: any) => (
              <ConcertCard key={concert._id} concert={concert} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Aucune date annoncée pour le moment.</p>
            <p className="text-gray-500 text-sm mt-2">Revenez bientôt pour découvrir nos prochains concerts.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export const revalidate = 60