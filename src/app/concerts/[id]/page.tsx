import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { CONCERT_BY_ID_QUERY } from '@/sanity/queries'
import type { Metadata } from 'next'

interface Concert {
  _id: string
  titre: string
  date: string
  heure?: string
  lieu: string
  adresse?: string
  ville: string
  description?: string
  descriptionLongue?: string
  affiche?: { asset?: { url?: string } }
  lienTickets?: string
  statut: string
  prixFcfa?: number
  programme?: { heure: string; activite: string }[]
}

interface PageProps {
  params: Promise<{ id: string }>
}

async function getConcert(id: string): Promise<Concert | null> {
  return client.fetch(CONCERT_BY_ID_QUERY, { id })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const concert = await getConcert(id)
  if (!concert) {
    return { title: 'Concert introuvable' }
  }
  const dateFormatee = new Date(concert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  return {
    title: `${concert.titre} - ${concert.ville}`,
    description: concert.description || `SenCamCong en concert a ${concert.lieu}, ${concert.ville} le ${dateFormatee}.`,
    openGraph: {
      title: `${concert.titre} | SenCamCong`,
      description: concert.description,
      images: concert.affiche?.asset?.url ? [{ url: concert.affiche.asset.url }] : undefined,
    },
  }
}

const statutLabels: Record<string, string> = {
  'a-venir': 'A venir',
  'passe': 'Passe',
  'complet': 'Complet',
}

export default async function ConcertDetailPage({ params }: PageProps) {
  const { id } = await params
  const concert = await getConcert(id)

  if (!concert) {
    notFound()
  }

  const dateFormatee = new Date(concert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="mb-8">
          <Link href="/concerts" className="text-gray-400 hover:text-white transition-colors">
            Retour aux concerts
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
          </div>
          <span className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-2 block">
            {statutLabels[concert.statut] || concert.statut}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{concert.titre}</h1>
          <p className="text-2xl text-gray-300">{dateFormatee}{concert.heure ? ` - ${concert.heure}` : ''}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {concert.affiche?.asset?.url ? (
                <Image
                  src={concert.affiche.asset.url}
                  alt={concert.titre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <p className="text-zinc-600">Affiche a venir</p>
              )}
            </div>

            {(concert.description || concert.descriptionLongue) && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">A propos de l'evenement</h2>
                {concert.description && <p className="text-gray-300 mb-6 leading-relaxed">{concert.description}</p>}
                {concert.descriptionLongue && (
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">{concert.descriptionLongue}</div>
                )}
              </div>
            )}

            {concert.programme && concert.programme.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Programme</h2>
                <ul className="space-y-3">
                  {concert.programme.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="text-green-500 font-semibold w-16 flex-shrink-0">{item.heure}</span>
                      <span className="text-gray-300">{item.activite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Informations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Lieu</p>
                  <p className="text-white">{concert.lieu}</p>
                </div>
                {concert.adresse && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Adresse</p>
                    <p className="text-white">{concert.adresse}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Ville</p>
                  <p className="text-white">{concert.ville}</p>
                </div>
                {concert.prixFcfa && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Prix</p>
                    <p className="text-white">{concert.prixFcfa.toLocaleString()} FCFA</p>
                  </div>
                )}
              </div>
              {concert.lienTickets && concert.statut === 'a-venir' && (
                <a
                  href={concert.lienTickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  Reserver
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60