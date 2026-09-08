import Image from 'next/image'
import { client } from '@/sanity/client'
import { BACKGROUND_BY_SECTION_QUERY } from '@/sanity/queries'

interface BackgroundImageProps {
  section: 'accueil' | 'concerts' | 'membres' | 'galerie' | 'contact' | 'global'
  fallback?: React.ReactNode
  className?: string
  overlayOpacity?: string
}

export default async function BackgroundImage({
  section,
  fallback,
  className = '',
  overlayOpacity = 'bg-black/40',
}: BackgroundImageProps) {
  const background = await client.fetch(
    BACKGROUND_BY_SECTION_QUERY,
    { section },
    { next: { revalidate: 60 } }
  )

  if (!background?.image?.asset?.url) {
    return fallback || null
  }

  const hotspot = background.image.hotspot
  const objectPosition = hotspot
    ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
    : 'center'

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <Image
        src={background.image.asset.url}
        alt={background.titre || ''}
        fill
        priority
        sizes="100vw"
        quality={90}
        style={{ objectFit: 'cover', objectPosition }}
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
    </div>
  )
}