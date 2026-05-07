import Image from 'next/image'
import { client } from '@/sanity/client'
import { BACKGROUND_BY_SECTION_QUERY } from '@/sanity/queries'

interface BackgroundImageProps {
  section: 'accueil' | 'concerts' | 'membres' | 'galerie' | 'contact' | 'global'
  fallback?: React.ReactNode
  className?: string
  overlayOpacity?: string
}

export default async function BackgroundImage({ section, fallback, className = '', overlayOpacity = 'bg-black/40' }: BackgroundImageProps) {
  const background = await client.fetch(BACKGROUND_BY_SECTION_QUERY, { section })
  
  console.log('BackgroundImage section:', section, 'result:', background)

  if (!background) {
    return fallback || null
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={background.image.asset.url}
        alt={background.titre}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={95}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
    </div>
  )
}
