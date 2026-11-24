import Link from 'next/link'

export interface Actualite {
  _id: string
  titre: string
  slug?: { current?: string }
  date: string
  categorie?: string
  extrait?: string
  imagePrincipale?: { asset?: { url?: string } }
}

interface ActualiteCardProps {
  actualite: Actualite
}

const categorieLabels: Record<string, string> = {
  'actualite': 'Actualité',
  'communique': 'Communiqué',
  'musique': 'Musique',
  'concert': 'Concert',
  'evenement': 'Événement',
}

export function formatActualiteDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ActualiteCard({ actualite }: ActualiteCardProps) {
  const slug = actualite.slug?.current || actualite._id

  return (
    <Link href={`/actualites/${slug}`} className="block group">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-green-500 group-hover:shadow-2xl group-hover:shadow-green-500/20">
        <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
          {actualite.imagePrincipale?.asset?.url ? (
            <img
              src={actualite.imagePrincipale.asset.url}
              alt={actualite.titre}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-center">
              <svg className="w-16 h-16 text-zinc-700 mx-auto mb-2 group-hover:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-zinc-600 text-sm group-hover:text-green-500 transition-colors duration-300">Actualité</p>
            </div>
          )}
          {actualite.categorie && (
            <div className="absolute top-4 right-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-green-500">
                {categorieLabels[actualite.categorie] || actualite.categorie}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex gap-1 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-500 transition-colors duration-300 line-clamp-2">
            {actualite.titre}
          </h3>

          <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatActualiteDate(actualite.date)}
          </p>

          {actualite.extrait && (
            <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-white transition-colors duration-300">
              {actualite.extrait}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
