import Link from 'next/link'
import { Card, Badge, Button } from '@/components/ui/card'

interface ConcertCardProps {
  concert: {
    _id?: string
    id?: string
    titre: string
    date: string
    lieu: string
    ville: string
    description: string
    statut: string
    lienTickets?: string
    prixFcfa?: number
    affiche?: {
      asset?: {
        url?: string
      }
    }
  }
  whatsappNumber?: string
}

export default function ConcertCard({ concert, whatsappNumber = "33612345678" }: ConcertCardProps) {
  const id = concert._id || concert.id

  const statutLabels = {
    'a-venir': 'À venir',
    'passe': 'Passé',
    'complet': 'Complet'
  }

  const whatsappMessage = `Bonjour, je souhaite réserver des places pour le concert "${concert.titre}" le ${concert.date} à ${concert.lieu}. Merci de me renseigner sur les disponibilités.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Card status={concert.statut as any} hover>
      {/* Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
        {concert.affiche?.asset?.url ? (
          <img
            src={concert.affiche.asset.url}
            alt={concert.titre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 text-zinc-700 mx-auto mb-2 group-hover:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-zinc-600 text-sm group-hover:text-green-500 transition-colors duration-300">Affiche</p>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge status={concert.statut as any}>
            {statutLabels[concert.statut as keyof typeof statutLabels] || concert.statut}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 group-hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-green-500 text-sm font-semibold uppercase tracking-wider">
            {statutLabels[concert.statut as keyof typeof statutLabels] || concert.statut}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-500 transition-colors duration-300">
          {concert.titre}
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-gray-400 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {concert.date}
          </p>
          <p className="text-white flex items-center gap-2">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {concert.lieu}
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2 group-hover:text-gray-400 transition-colors duration-300">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {concert.ville}
          </p>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 group-hover:text-white transition-colors duration-300">{concert.description}</p>

        {concert.prixFcfa && (
          <div className="mb-6">
            <p className="text-green-500 font-bold text-lg group-hover:text-white transition-colors duration-300">
              {concert.prixFcfa.toLocaleString()} FCFA
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {concert.statut === 'a-venir' && (
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="full"
            >
              Réserver
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
