$content = @'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { MEMBRE_BY_ID_QUERY } from '@/sanity/queries'
import type { Metadata } from 'next'

interface Membre {
  _id: string
  nom: string
  role: string
  origine: string
  bio?: string
  bioLongue?: string
  photo?: { asset?: { url?: string } }
}

async function getMembre(id: string): Promise<Membre | null> {
  return client.fetch(MEMBRE_BY_ID_QUERY, { id })
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const membre = await getMembre(params.id)
  if (!membre) {
    return { title: 'Membre introuvable' }
  }
  return {
    title: membre.nom,
    description: membre.bio || `Decouvrez ${membre.nom}, membre de SenCamCong originaire du ${membre.origine}.`,
    openGraph: {
      title: `${membre.nom} | SenCamCong`,
      description: membre.bio,
      images: membre.photo?.asset?.url ? [{ url: membre.photo.asset.url }] : undefined,
    },
  }
}

export default async function MembreDetailPage({ params }: { params: { id: string } }) {
  const membre = await getMembre(params.id)

  if (!membre) {
    notFound()
  }

  const origineColors: Record<string, string> = {
    'Senegal': 'text-green-500',
    'Cameroun': 'text-yellow-500',
    'Congo': 'text-red-500',
  }
  const origineColor = origineColors[membre.origine] || 'text-white'

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/membres" className="text-gray-400 hover:text-white transition-colors">
            Retour aux membres
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
            <div className="w-12 h-1 bg-green-500"></div>
          </div>
          <span className={`text-sm font-semibold uppercase tracking-wider mb-2 block ${origineColor}`}>
            {membre.origine}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{membre.nom}</h1>
          <p className="text-2xl text-gray-300">{membre.role}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 pb-24">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {membre.photo?.asset?.url ? (
                <Image
                  src={membre.photo.asset.url}
                  alt={membre.nom}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">
                    {membre.nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>

            {(membre.bio || membre.bioLongue) && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Biographie</h2>
                {membre.bio && <p className="text-gray-300 mb-6 leading-relaxed">{membre.bio}</p>}
                {membre.bioLongue && (
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">{membre.bioLongue}</div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Informations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Origine</p>
                  <p className="text-white">{membre.origine}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Role</p>
                  <p className="text-white">{membre.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Reseaux sociaux</h3>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/sencamcong/" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-green-500 transition-colors text-white text-center">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
'@

[System.IO.File]::WriteAllText("$PWD\src\app\membres\[id]\page.tsx", $content, [System.Text.Encoding]::UTF8)
Write-Output "Fichier membre reecrit avec succes"