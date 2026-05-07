import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function MembreDetailPage({ params }: { params: { id: string } }) {
  // Données mockées pour l'instant
  const membre = {
    nom: "Amadou Diallo",
    role: "Chant / Percussions",
    origine: "Sénégal",
    bio: "Maître du djembe et des chants traditionnels wolof avec plus de 20 ans d'expérience",
    bioLongue: "Amadou Diallo est né à Dakar, Sénégal, où il a grandi entouré par la musique traditionnelle wolof. Dès l'âge de 8 ans, il a commencé à apprendre le djembe auprès des maîtres percussionnistes de son quartier.\n\nAprès des études de musique à l'École des Arts de Dakar, Amadou a voyagé à travers l'Afrique de l'Ouest pour perfectionner sa technique et découvrir les différents styles de percussion. Il a collaboré avec de nombreux artistes internationaux avant de rejoindre SenCamCong.\n\nSa voix puissante et sa maîtrise du djembe apportent une énergie unique au groupe, incarnant l'esprit vibrant du Sénégal dans chaque performance.",
    instruments: ["Djembe", "Sabar", "Tama", "Chant"],
    influences: ["Youssou N'Dour", "Baaba Maal", "Orchestre Baobab"],
    collaborations: ["Artistes sénégalais", "Groupes afrobeat internationaux"]
  }

  const origineColors = {
    'Sénégal': 'from-green-500 to-green-600',
    'Cameroun': 'from-yellow-500 to-yellow-600',
    'Congo': 'from-red-500 to-red-600'
  }

  const gradientColor = origineColors[membre.origine as keyof typeof origineColors] || 'from-zinc-500 to-zinc-600'

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/membres" className="text-gray-400 hover:text-white transition-colors">
            ← Retour aux membres
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <div className="w-12 h-1 bg-yellow-500"></div>
            <div className="w-12 h-1 bg-red-500"></div>
            <div className="w-12 h-1 bg-green-500"></div>
          </div>
          <span className={`text-sm font-semibold uppercase tracking-wider mb-2 block ${membre.origine === 'Sénégal' ? 'text-green-500' : membre.origine === 'Cameroun' ? 'text-yellow-500' : 'text-red-500'}`}>
            {membre.origine}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{membre.nom}</h1>
          <p className="text-2xl text-gray-300">{membre.role}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo */}
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">
                  {membre.nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Biographie</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{membre.bio}</p>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{membre.bioLongue}</div>
            </div>

            {/* Instruments */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Instruments</h2>
              <div className="flex flex-wrap gap-3">
                {membre.instruments.map((instrument, index) => (
                  <span key={index} className="px-4 py-2 bg-zinc-800 rounded-full text-gray-300 border border-zinc-700">
                    {instrument}
                  </span>
                ))}
              </div>
            </div>

            {/* Influences */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Influences</h2>
              <div className="flex flex-wrap gap-3">
                {membre.influences.map((influence, index) => (
                  <span key={index} className="px-4 py-2 bg-zinc-800 rounded-full text-gray-300 border border-zinc-700">
                    {influence}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Informations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Origine</p>
                  <p className="text-white">{membre.origine}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Rôle</p>
                  <p className="text-white">{membre.role}</p>
                </div>
              </div>
            </div>

            {/* Collaborations */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Collaborations</h3>
              <ul className="space-y-2">
                {membre.collaborations.map((collab, index) => (
                  <li key={index} className="text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    {collab}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Réseaux sociaux</h3>
              <div className="flex gap-3">
                <a href="#" className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-green-500 transition-colors text-white text-center">
                  Instagram
                </a>
                <a href="#" className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-yellow-500 transition-colors text-white text-center">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
