import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { ACTUALITE_BY_SLUG_QUERY } from '@/sanity/queries'
import { formatActualiteDate } from '@/components/ActualiteCard'
import type { Metadata } from 'next'

interface Actualite {
  _id: string
  titre: string
  slug?: { current?: string }
  date: string
  categorie?: string
  extrait?: string
  imagePrincipale?: { asset?: { url?: string } }
  miseEnAvant?: boolean
  sections?: {
    titre?: string
    texte?: string
    image?: { asset?: { url?: string } }
  }[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getActualite(slug: string): Promise<Actualite | null> {
  return client.fetch(ACTUALITE_BY_SLUG_QUERY, { slug })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const actualite = await getActualite(slug)
  if (!actualite) {
    return { title: 'Actualité introuvable' }
  }
  return {
    title: `${actualite.titre} - Actualités`,
    description: actualite.extrait || actualite.titre,
    openGraph: {
      title: `${actualite.titre} | SenCamCong`,
      description: actualite.extrait,
      images: actualite.imagePrincipale?.asset?.url ? [{ url: actualite.imagePrincipale.asset.url }] : undefined,
    },
  }
}

const categorieLabels: Record<string, string> = {
  'actualite': 'Actualité',
  'communique': 'Communiqué',
  'musique': 'Musique',
  'concert': 'Concert',
  'evenement': 'Événement',
}

export default async function ActualiteDetailPage({ params }: PageProps) {
  const { slug } = await params
  const actualite = await getActualite(slug)

  if (!actualite) {
    notFound()
  }

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-24">
        <div className="mb-8">
          <Link href="/actualites" className="text-gray-400 hover:text-white transition-colors">
            Retour aux actualités
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
          </div>
          {actualite.categorie && (
            <span className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-2 block">
              {categorieLabels[actualite.categorie] || actualite.categorie}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{actualite.titre}</h1>
          <p className="text-xl text-gray-300">{formatActualiteDate(actualite.date)}</p>
        </div>

        <div className="space-y-8">
          {actualite.imagePrincipale?.asset?.url && (
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl relative overflow-hidden">
              <Image
                src={actualite.imagePrincipale.asset.url}
                alt={actualite.titre}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}

          {actualite.extrait && (
            <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-green-500 pl-6">
              {actualite.extrait}
            </p>
          )}

          {actualite.sections && actualite.sections.length > 0 ? (
            actualite.sections.map((section, index) => (
              <div key={index} className="space-y-6">
                {section.titre && (
                  <h2 className="text-2xl font-bold text-white">{section.titre}</h2>
                )}
                {section.texte && (
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">{section.texte}</div>
                )}
                {section.image?.asset?.url && (
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl relative overflow-hidden">
                    <Image
                      src={section.image.asset.url}
                      alt={section.titre || actualite.titre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 896px) 100vw, 896px"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            !actualite.extrait && (
              <p className="text-gray-400">Aucun contenu supplémentaire pour cette actualité.</p>
            )
          )}
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
