import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos Membres",
  description: "Decouvrez les artistes de SenCamCong, musiciens venus du Senegal, du Cameroun et du Congo.",
}

import MembreCard from '@/components/MembreCard'
import BackgroundImage from '@/components/BackgroundImage'
import { client } from '@/sanity/client'
import { MEMBRES_QUERY } from '@/sanity/queries'

export default async function MembresPage() {
  const membres = await client.fetch(MEMBRES_QUERY)

  // Fallback aux donnÃ©es mockÃ©es si Sanity n'est pas configurÃ©
  const fallbackMembres = [
    {
      _id: "1",
      nom: "Amadou Diallo",
      role: "Chant / Percussions",
      origine: "SÃ©nÃ©gal",
      bio: "MaÃ®tre du djembe et des chants traditionnels wolof avec plus de 20 ans d'expÃ©rience"
    },
    {
      _id: "2",
      nom: "Jean-Pierre Mba",
      role: "Guitare / Composition",
      origine: "Cameroun",
      bio: "Fusion de makossa et de jazz moderne, diplÃ´mÃ© du Conservatoire de Douala"
    },
    {
      _id: "3",
      nom: "Marie-Claire Nsangi",
      role: "Chant / Danse",
      origine: "Congo",
      bio: "Voix puissante inspirÃ©e du rumba congolais, ancienne star de Kinshasa"
    },
    {
      _id: "4",
      nom: "Ibrahima Fall",
      role: "Basse",
      origine: "SÃ©nÃ©gal",
      bio: "Rythmes deep afrobeat, collaborateur avec des artistes internationaux"
    },
    {
      _id: "5",
      nom: "Emmanuel Etame",
      role: "Claviers",
      origine: "Cameroun",
      bio: "MÃ©lodies inspirÃ©es du bikutsi, virtuose du piano et des synthÃ©tiseurs"
    },
    {
      _id: "6",
      nom: "FÃ©licien Mputu",
      role: "Batterie",
      origine: "Congo",
      bio: "Energie pure du soukous, percussionniste renommÃ© en Afrique centrale"
    }
  ]

  const membresToShow = membres.length > 0 ? membres : fallbackMembres

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      
      {/* Page Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <BackgroundImage
          section="membres"
          overlayOpacity="bg-black/20"
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1600 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000000'/%3E%3Cstop offset='50%25' stop-color='%232e1d00'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill-opacity='0.1'%3E%3Ccircle cx='300' cy='300' r='180' fill='%23eab308'/%3E%3Ccircle cx='1300' cy='600' r='220' fill='%23eab308'/%3E%3Ccircle cx='700' cy='400' r='120' fill='%23eab308'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          }
        />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex gap-3 mb-6">
            <div className="w-16 md:w-24 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-16 md:w-24 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-16 md:w-24 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Membres</h1>
          <p className="text-lg md:text-2xl text-gray-300">Les talents de SenCamCong</p>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 pb-24 md:pb-12">

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {membresToShow.map((membre: any) => (
            <MembreCard key={membre._id} membre={membre} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
