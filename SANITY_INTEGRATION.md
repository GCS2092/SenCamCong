# Guide d'intégration Sanity pour SenCamCong

Ce guide explique comment intégrer Sanity CMS dans votre projet Next.js SenCamCong.

## Étape 1: Créer un compte Sanity

1. Allez sur https://www.sanity.io/
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre `Project ID` (disponible dans sanity.io/manage)

## Étape 2: Installer Sanity Studio

```bash
npm create sanity@latest -- --project-id VOTRE_PROJECT_ID \
  --dataset production --template clean \
  --output-path studio
```

## Étape 3: Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=votre_token_lecture
SANITY_API_WRITE_TOKEN=votre_token_ecriture
```

**Pour obtenir les tokens:**
1. Allez sur sanity.io/manage
2. Sélectionnez votre projet
3. Allez dans API > Tokens
4. Créez un token avec les permissions nécessaires

## Étape 4: Configurer les schémas dans Sanity Studio

Les schémas sont déjà créés dans `src/sanity/schemas/`:
- `concert.ts` - Pour les concerts
- `membre.ts` - Pour les membres du groupe
- `galerie.ts` - Pour les images de la galerie

Pour les utiliser dans Sanity Studio, vous devez les copier dans le dossier `studio/schemas/`:

```bash
# Créer le dossier schemas dans studio
mkdir studio/schemas

# Copier les schémas
cp src/sanity/schemas/*.ts studio/schemas/
```

Puis créez un fichier `studio/schemas/index.ts`:

```typescript
import concert from './concert'
import membre from './membre'
import galerie from './galerie'

export const schema = {
  types: [concert, membre, galerie]
}
```

## Étape 5: Connecter Next.js à Sanity

Les fichiers de configuration sont déjà créés:
- `src/sanity/client.ts` - Configuration du client Sanity
- `src/sanity/queries.ts` - Requêtes GROQ pour récupérer les données

## Étape 6: Utiliser les données Sanity dans vos pages

### Exemple pour la page concerts:

```typescript
import { client } from '@/sanity/client'
import { CONCERTS_QUERY } from '@/sanity/queries'
import ConcertCard from '@/components/ConcertCard'

export default async function ConcertsPage() {
  const concerts = await client.fetch(CONCERTS_QUERY)

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {concerts.map((concert) => (
        <ConcertCard key={concert._id} concert={concert} />
      ))}
    </div>
  )
}
```

### Exemple pour une page de détail de concert:

```typescript
import { client } from '@/sanity/client'
import { CONCERT_BY_ID_QUERY } from '@/sanity/queries'

export default async function ConcertDetailPage({ params }: { params: { id: string } }) {
  const concert = await client.fetch(CONCERT_BY_ID_QUERY, { id: params.id })

  if (!concert) {
    return <div>Concert non trouvé</div>
  }

  return (
    <div>
      <h1>{concert.titre}</h1>
      <p>{concert.date}</p>
      {/* Afficher les détails du concert */}
    </div>
  )
}
```

## Étape 7: Déployer Sanity Studio

Option 1: Déployer sur Sanity (gratuit)
```bash
cd studio
npm run deploy
```

Option 2: Intégrer dans Next.js
Ajoutez la configuration dans `next.config.ts` pour servir le studio depuis votre app.

## Étape 8: Configurer le webhook (optionnel)

Pour que le site se mette à jour automatiquement quand vous modifiez le contenu dans Sanity:

1. Allez dans sanity.io/manage > API > Webhooks
2. Créez un nouveau webhook
3. URL: `https://votre-domaine.com/api/revalidate`
4. Sélectionnez les événements: create, update, delete

Créez ensuite l'endpoint API dans Next.js:

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  
  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }
  
  return NextResponse.json({ revalidated: false })
}
```

## Étape 9: Mettre à jour les pages existantes

Remplacez les données mockées par les données Sanity:

### Page concerts (`src/app/concerts/page.tsx`):

```typescript
import { client } from '@/sanity/client'
import { CONCERTS_QUERY } from '@/sanity/queries'
import ConcertCard from '@/components/ConcertCard'

export default async function ConcertsPage() {
  const concerts = await client.fetch(CONCERTS_QUERY)

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Concerts</h1>
          <p className="text-xl text-gray-400">Nos prochaines dates</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {concerts.map((concert) => (
            <ConcertCard key={concert._id} concert={concert} />
          ))}
        </div>
      </main>
    </div>
  )
}

// Revalider le cache toutes les 60 secondes
export const revalidate = 60
```

### Page membres (`src/app/membres/page.tsx`):

```typescript
import { client } from '@/sanity/client'
import { MEMBRES_QUERY } from '@/sanity/queries'
import MembreCard from '@/components/MembreCard'

export default async function MembresPage() {
  const membres = await client.fetch(MEMBRES_QUERY)

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
            <div className="w-12 h-1 bg-green-500"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Membres</h1>
          <p className="text-xl text-gray-400">Les talents de SenCamCong</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {membres.map((membre) => (
            <MembreCard key={membre._id} membre={membre} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
```

### Page galerie (`src/app/galerie/page.tsx`):

```typescript
import { client } from '@/sanity/client'
import { GALERIE_QUERY } from '@/sanity/queries'

export default async function GaleriePage() {
  const images = await client.fetch(GALERIE_QUERY)

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-red-500"></div>
            <div className="w-12 h-1 bg-green-500"></div>
            <div className="w-12 h-1 bg-yellow-500"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Galerie</h1>
          <p className="text-xl text-gray-400">Nos meilleurs moments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image._id} className="aspect-square">
              <img src={image.image.asset.url} alt={image.titre} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export const revalidate = 60
```

## Résumé

Tous les fichiers nécessaires sont déjà créés:
- ✅ Schémas Sanity dans `src/sanity/schemas/`
- ✅ Client Sanity dans `src/sanity/client.ts`
- ✅ Requêtes GROQ dans `src/sanity/queries.ts`
- ✅ Composants réutilisables (ConcertCard, MembreCard)
- ✅ Pages avec données mockées (facilement remplaçables par Sanity)

Il ne vous reste qu'à:
1. Créer un compte Sanity
2. Configurer les variables d'environnement
3. Installer Sanity Studio
4. Copier les schémas dans le dossier studio
5. Remplacer les données mockées par les appels Sanity dans les pages

Une fois ces étapes terminées, vous pourrez gérer tout votre contenu (concerts, membres, galerie) depuis l'interface Sanity Studio sans toucher au code.
