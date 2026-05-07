import Navigation from '@/components/Navigation'
import ConcertCard from '@/components/ConcertCard'
import BackgroundImage from '@/components/BackgroundImage'
import { client } from '@/sanity/client'
import { CONCERTS_QUERY } from '@/sanity/queries'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678"

export default async function ConcertsPage() {
  const concerts = await client.fetch(CONCERTS_QUERY)

  // Fallback aux données mockées si Sanity n'est pas configuré
  const fallbackConcerts = [
    {
      _id: "1",
      titre: "Festival Afrobeat",
      date: "15 Juin 2026",
      lieu: "Olympia",
      ville: "Paris",
      description: "Une soirée explosive avec les sons du Sénégal, Cameroun et Congo",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 25000
    },
    {
      _id: "2",
      titre: "Soirée Culturelle",
      date: "22 Juillet 2026",
      lieu: "Zenith",
      ville: "Lyon",
      description: "Célébration de la musique africaine",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 20000
    },
    {
      _id: "3",
      titre: "Concert Caritatif",
      date: "10 Août 2026",
      lieu: "Arena",
      ville: "Marseille",
      description: "Au profit des écoles en Afrique",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 15000
    },
    {
      _id: "4",
      titre: "Festival Summer",
      date: "5 Septembre 2026",
      lieu: "Parc des Expositions",
      ville: "Bordeaux",
      description: "Grande scène en plein air",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 30000
    },
    {
      _id: "5",
      titre: "Concert Privé",
      date: "20 Octobre 2026",
      lieu: "Bataclan",
      ville: "Paris",
      description: "Soirée exclusive",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 50000
    },
    {
      _id: "6",
      titre: "Tournée Finale",
      date: "15 Décembre 2026",
      lieu: "Accor Arena",
      ville: "Paris",
      description: "Grand final de l'année",
      statut: "a-venir",
      lienTickets: "#",
      prixFcfa: 40000
    }
  ]

  const concertsToShow = concerts.length > 0 ? concerts : fallbackConcerts

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

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {concertsToShow.map((concert: any) => (
            <ConcertCard key={concert._id} concert={concert} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
