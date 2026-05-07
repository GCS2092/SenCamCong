import Navigation from '@/components/Navigation'
import Link from 'next/link'

// Cette page sera connectée à Sanity plus tard
export default function ConcertDetailPage({ params }: { params: { id: string } }) {
  // Données mockées pour l'instant
  const concert = {
    titre: "Festival Afrobeat",
    date: "15 Juin 2026",
    heure: "20h00",
    lieu: "Olympia",
    adresse: "28 Bd des Capucines, 75009 Paris",
    ville: "Paris",
    description: "Une soirée explosive avec les sons du Sénégal, Cameroun et Congo. Rejoignez-nous pour une expérience musicale unique qui célèbre la diversité culturelle africaine.",
    descriptionLongue: "Le Festival Afrobeat est une célébration de la musique africaine moderne. SenCamCong vous emmènera dans un voyage musical à travers les rythmes envoûtants du Sénégal, les mélodies captivantes du Cameroun et l'énergie vibrante du Congo.\n\nCette soirée exceptionnelle comprendra :\n- 2 heures de concert ininterrompu\n- Des performances acoustiques exclusives\n- Une session de rencontre avec les artistes\n- Des surprises spéciales tout au long de la soirée",
    statut: "a-venir",
    prix: "À partir de 35€",
    lienTickets: "#",
    programme: [
      { heure: "20h00", activité: "Ouverture des portes" },
      { heure: "20h30", activité: "Premier partie - Artistes locaux" },
      { heure: "21h00", activité: "Concert SenCamCong" },
      { heure: "22h30", activité: "Session acoustique" },
      { heure: "23h00", activité: "Rencontre avec les artistes" }
    ]
  }

  const statutLabels = {
    'a-venir': 'À venir',
    'passe': 'Passé',
    'complet': 'Complet'
  }

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/concerts" className="text-gray-400 hover:text-white transition-colors">
            ← Retour aux concerts
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
          </div>
          <span className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-2 block">
            {statutLabels[concert.statut as keyof typeof statutLabels]}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{concert.titre}</h1>
          <p className="text-2xl text-gray-300">{concert.date} à {concert.heure}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image placeholder */}
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 text-zinc-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-zinc-600">Affiche du concert</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">À propos du concert</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{concert.description}</p>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{concert.descriptionLongue}</div>
            </div>

            {/* Programme */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Programme de la soirée</h2>
              <div className="space-y-4">
                {concert.programme.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-20 text-green-500 font-semibold">{item.heure}</div>
                    <div className="flex-1 text-gray-300">{item.activite}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Informations pratiques</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Date et heure</p>
                  <p className="text-white">{concert.date} à {concert.heure}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Lieu</p>
                  <p className="text-white">{concert.lieu}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Adresse</p>
                  <p className="text-white">{concert.adresse}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Ville</p>
                  <p className="text-white">{concert.ville}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Prix</p>
                  <p className="text-white">{concert.prix}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {concert.statut === 'a-venir' && (
              <a
                href={concert.lienTickets}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 text-center"
              >
                Réserver des billets
              </a>
            )}

            {/* Share */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Partager l'événement</h3>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-green-500 transition-colors text-white">
                  Facebook
                </button>
                <button className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-yellow-500 transition-colors text-white">
                  Twitter
                </button>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Plan d'accès</h3>
              <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Carte interactive</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
