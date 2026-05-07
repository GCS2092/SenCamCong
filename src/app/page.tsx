import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function Home() {
  const prochainConcert = {
    titre: "Festival Afrobeat",
    date: "15 Juin 2026",
    lieu: "Olympia, Paris",
    description: "Une soirée explosive avec les sons du Sénégal, Cameroun et Congo"
  }

  const membresPreview = [
    { nom: "Amadou Diallo", role: "Chant / Percussions", origine: "Sénégal" },
    { nom: "Jean-Pierre Mba", role: "Guitare / Composition", origine: "Cameroun" },
    { nom: "Marie-Claire Nsangi", role: "Chant / Danse", origine: "Congo" }
  ]

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <Hero />

      {/* Prochain Concert Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn delay={100}>
          <div className="flex gap-2 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-1 bg-green-500"></div>
            <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
            <div className="w-8 md:w-12 h-1 bg-red-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Prochain Concert</h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 lg:p-12 hover:border-green-500 transition-all duration-300">
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              <div>
                <span className="text-green-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 block">
                  À venir
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">{prochainConcert.titre}</h3>
                <p className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">{prochainConcert.date}</p>
                <p className="text-white mb-3 md:mb-4 text-sm md:text-base">{prochainConcert.lieu}</p>
                <p className="text-gray-400 text-sm md:text-base">{prochainConcert.description}</p>
              </div>
              <div className="flex flex-col justify-center">
                <Link
                  href="/concerts"
                  className="inline-block text-center px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Voir tous les concerts
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Membres Preview Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900/50">
        <FadeIn delay={200}>
          <div className="flex gap-2 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
            <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            <div className="w-8 md:w-12 h-1 bg-green-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Nos Membres</h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12">Les talents de SenCamCong</p>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {membresPreview.map((membre, index) => (
              <div
                key={membre.nom}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300"
              >
                <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {membre.nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{membre.nom}</h3>
                <p className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">{membre.role}</p>
                <p className="text-yellow-500 text-xs md:text-sm mb-3 md:mb-4">{membre.origine}</p>
                <Link
                  href="/membres"
                  className="inline-block px-4 md:px-6 py-2 md:py-3 bg-zinc-800 text-white rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 text-sm md:text-base"
                >
                  En savoir plus
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Link
              href="/membres"
              className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base"
            >
              Voir tous les membres
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Nos Performances Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn delay={300}>
          <div className="flex gap-2 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
            <div className="w-8 md:w-12 h-1 bg-green-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Nos Performances</h2>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-red-500 transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-1 md:mb-2">150+</div>
              <div className="text-white text-sm md:text-base">Concerts</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 md:mb-2">12</div>
              <div className="text-white text-sm md:text-base">Pays</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-green-500 transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 mb-1 md:mb-2">50K+</div>
              <div className="text-white text-sm md:text-base">Spectateurs</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 md:mb-2">5</div>
              <div className="text-white text-sm md:text-base">Albums</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Notre Histoire Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900/50">
        <FadeIn delay={400}>
          <div className="flex gap-2 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-1 bg-green-500"></div>
            <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Notre Histoire</h2>

          <div className="space-y-6 md:space-y-8">
            <div className="flex gap-4 md:gap-6">
              <div className="w-20 md:w-32 flex-shrink-0">
                <div className="text-green-500 font-bold text-lg md:text-xl">2021</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">La Création</h3>
                <p className="text-gray-400 text-sm md:text-base">Trois musiciens se rencontrent à Paris avec une vision commune : fusionner les musiques du Sénégal, Cameroun et Congo.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="w-20 md:w-32 flex-shrink-0">
                <div className="text-yellow-500 font-bold text-lg md:text-xl">2022</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Premier Album</h3>
                <p className="text-gray-400 text-sm md:text-base">Sortie de "Trois Terres, Une Voix" qui propulse le groupe sur la scène internationale.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="w-20 md:w-32 flex-shrink-0">
                <div className="text-red-500 font-bold text-lg md:text-xl">2023</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Tournée Mondiale</h3>
                <p className="text-gray-400 text-sm md:text-base">Tournée à travers l'Europe, l'Afrique et l'Amérique du Nord avec des salles combles.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="w-20 md:w-32 flex-shrink-0">
                <div className="text-green-500 font-bold text-lg md:text-xl">2024</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Reconnaissance</h3>
                <p className="text-gray-400 text-sm md:text-base">Prix du Meilleur Groupe Africain aux World Music Awards et collaboration avec des artistes internationaux.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* À Propos Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn delay={500}>
          <div className="flex gap-2 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
            <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            <div className="w-8 md:w-12 h-1 bg-green-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">À Propos</h2>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-green-500 transition-all duration-300">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-green-500 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl font-bold text-white">SN</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Sénégal</h3>
              <p className="text-gray-400 text-sm md:text-base">Rythmes wolof, sabar et mbalax pour une énergie pure et authentique.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500 transition-all duration-300">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl font-bold text-white">CM</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Cameroun</h3>
              <p className="text-gray-400 text-sm md:text-base">Influences makossa, bikutsi et afrobeat pour une fusion moderne.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-red-500 transition-all duration-300">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-red-500 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl md:text-2xl font-bold text-white">CG</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Congo</h3>
              <p className="text-gray-400 text-sm md:text-base">Rumba congolaise, soukous et ndombolo pour une danse endiablée.</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">SenCamCong</h3>
              <p className="text-gray-400 text-sm md:text-base">Sénégal • Cameroun • Congo</p>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-gray-500 text-sm">
              2024 SenCamCong
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
