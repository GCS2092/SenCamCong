import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { CONCERTS_QUERY, MEMBRES_QUERY } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sencamcong.com'

  const staticRoutes: MetadataRoute.Sitemap = ['', '/concerts', '/membres', '/galerie', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  let concertRoutes: MetadataRoute.Sitemap = []
  try {
    const concerts = await client.fetch(CONCERTS_QUERY)
    concertRoutes = concerts.map((c: { _id: string }) => ({
      url: `${baseUrl}/concerts/${c._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    concertRoutes = []
  }

  let membreRoutes: MetadataRoute.Sitemap = []
  try {
    const membres = await client.fetch(MEMBRES_QUERY)
    membreRoutes = membres.map((m: { _id: string }) => ({
      url: `${baseUrl}/membres/${m._id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch {
    membreRoutes = []
  }

  return [...staticRoutes, ...concertRoutes, ...membreRoutes]
}