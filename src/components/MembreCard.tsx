import Link from 'next/link'
import { Card, Button } from '@/components/ui/card'

interface MembreCardProps {
  membre: {
    _id?: string
    id?: string
    nom: string
    role: string
    bio: string
    origine: string
    photo?: {
      asset?: {
        url?: string
      }
    }
  }
}

export default function MembreCard({ membre }: MembreCardProps) {
  const id = membre._id || membre.id

  const origineColors = {
    'Sénégal': 'from-green-500 to-green-600',
    'Cameroun': 'from-yellow-500 to-yellow-600',
    'Congo': 'from-red-500 to-red-600'
  }

  const gradientColor = origineColors[membre.origine as keyof typeof origineColors] || 'from-zinc-500 to-zinc-600'

  return (
    <Card status="a-venir" hover>
      {/* Photo / Avatar */}
      <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
        {membre.photo?.asset?.url ? (
          <img
            src={membre.photo.asset.url}
            alt={membre.nom}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <span className="text-4xl font-bold text-white">
              {membre.nom.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white group-hover:bg-${membre.origine === 'Sénégal' ? 'green' : membre.origine === 'Cameroun' ? 'yellow' : 'red'}-500 transition-colors duration-300`}>
            {membre.origine}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 group-hover:scale-110 transition-transform duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors duration-300">
          {membre.nom}
        </h3>
        
        <p className="text-gray-400 mb-4 group-hover:text-white transition-colors duration-300">{membre.role}</p>

        <p className="text-gray-500 text-sm mb-6 line-clamp-3 group-hover:text-gray-400 transition-colors duration-300">{membre.bio}</p>

        {id && (
          <Link href={`/membres/${id}`} className="flex-1">
            <Button variant="secondary" size="full">
              En savoir plus
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
