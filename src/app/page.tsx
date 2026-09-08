import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { client } from '@/sanity/client'
import { MEMBRES_QUERY, CONCERTS_A_VENIR_QUERY, NOTRE_MUSIQUE_QUERY, NOS_PERFORMANCES_QUERY, NOTRE_HISTOIRE_QUERY, A_PROPOS_QUERY } from '@/sanity/queries'
import BackgroundImage from '@/components/BackgroundImage'

export default async function Home() {
  const membres = await client.fetch(MEMBRES_QUERY)
  const concerts = await client.fetch(CONCERTS_A_VENIR_QUERY)
  const notreMusique = await client.fetch(NOTRE_MUSIQUE_QUERY)
  const nosPerformances = await client.fetch(NOS_PERFORMANCES_QUERY)
  const notreHistoire = await client.fetch(NOTRE_HISTOIRE_QUERY)
  const aPropos = await client.fetch(A_PROPOS_QUERY)

  const prochainConcert = concerts.length > 0 ? {
    titre: concerts[0].titre,
    date: new Date(concerts[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    lieu: concerts[0].lieu,
    description: concerts[0].description
  } : null

  const membresPreview = membres.slice(0, 3)

  return (
    <div className="bg-black min-h-screen">
      <Navigation />

      <section className="relative min-h-screen overflow-hidden">
        <BackgroundImage
          section="accueil"
          overlayOpacity="bg-black/30"
        />
        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      {/* Notre Musique Section */}
      {notreMusique?.description && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeIn delay={100}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">{notreMusique?.titre || "Notre Musique"}</h2>

            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 lg:p-12 hover:border-zinc-700 transition-colors duration-300">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {notreMusique.description}
              </p>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Prochain Concert Section */}
      {prochainConcert && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeIn delay={200}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Prochain Concert</h2>

            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 lg:p-12 hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
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
      )}

      {/* Membres Preview Section */}
      {membresPreview.length > 0 && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900/30">
          <FadeIn delay={300}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Nos Membres</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12">Les talents de SenCamCong</p>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {membresPreview.map((membre: { _id?: string; nom: string; role: string; origine: string; photo?: { asset?: { url?: string } } }, index: number) => (
                <div
                  key={membre._id || `${membre.nom}-${index}`}
                  className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 hover:border-yellow-500/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-300"
                >
                  {membre.photo?.asset?.url ? (
                    <img
                      src={membre.photo.asset.url}
                      alt={membre.nom}
                      className="w-16 md:w-20 h-16 md:h-20 rounded-full object-cover mb-3 md:mb-4"
                    />
                  ) : (
                    <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold text-white">
                        {membre.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
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
      )}

      {/* Nos Performances Section */}
      {(nosPerformances?.description || nosPerformances?.concerts || nosPerformances?.pays || nosPerformances?.spectateurs || nosPerformances?.albums) && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeIn delay={400}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">{nosPerformances?.titre || "Nos Performances"}</h2>

            {nosPerformances?.description && (
              <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 lg:p-12 mb-8">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {nosPerformances.description}
                </p>
              </div>
            )}

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nosPerformances?.concerts && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-1 md:mb-2">{nosPerformances.concerts}</div>
                  <div className="text-white text-sm md:text-base">Concerts</div>
                </div>
              )}
              {nosPerformances?.pays && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 md:mb-2">{nosPerformances.pays}</div>
                  <div className="text-white text-sm md:text-base">Pays</div>
                </div>
              )}
              {nosPerformances?.spectateurs && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-green-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 mb-1 md:mb-2">{nosPerformances.spectateurs}</div>
                  <div className="text-white text-sm md:text-base">Spectateurs</div>
                </div>
              )}
              {nosPerformances?.albums && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 md:mb-2">{nosPerformances.albums}</div>
                  <div className="text-white text-sm md:text-base">Albums</div>
                </div>
              )}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Notre Histoire Section */}
      {(notreHistoire?.description || (notreHistoire?.evenements && notreHistoire.evenements.length > 0)) && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900/30">
          <FadeIn delay={500}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">{notreHistoire?.titre || "Notre Histoire"}</h2>

            <div className="space-y-6 md:space-y-8">
              {notreHistoire?.description && (
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {notreHistoire.description}
                </p>
              )}

              {(notreHistoire?.evenements || []).map((evenement: any, index: number) => (
                <div key={index} className="flex gap-4 md:gap-6 border-l border-zinc-800 pl-4 md:pl-6">
                  <div className="w-20 md:w-32 flex-shrink-0 -ml-4 md:-ml-6">
                    <div className={`${index === 0 ? 'text-green-500' : index === 1 ? 'text-yellow-500' : 'text-red-500'} font-bold text-lg md:text-xl pl-4 md:pl-6`}>
                      {evenement.annee}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{evenement.titre}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{evenement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* À Propos Section */}
      {(aPropos?.senegal?.description || aPropos?.cameroun?.description || aPropos?.congo?.description) && (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeIn delay={600}>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-1 bg-yellow-500"></div>
              <div className="w-8 md:w-12 h-1 bg-red-500"></div>
              <div className="w-8 md:w-12 h-1 bg-green-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">{aPropos?.titre || "À Propos"}</h2>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aPropos?.senegal?.description && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-green-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-green-500 flex items-center justify-center mb-3 md:mb-4">
                    <span className="text-xl md:text-2xl font-bold text-white">SN</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{aPropos.senegal.titre || "Sénégal"}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{aPropos.senegal.description}</p>
                </div>
              )}
              {aPropos?.cameroun?.description && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-yellow-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-3 md:mb-4">
                    <span className="text-xl md:text-2xl font-bold text-white">CM</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{aPropos.cameroun.titre || "Cameroun"}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{aPropos.cameroun.description}</p>
                </div>
              )}
              {aPropos?.congo?.description && (
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 md:p-6 lg:p-8 hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-red-500 flex items-center justify-center mb-3 md:mb-4">
                    <span className="text-xl md:text-2xl font-bold text-white">CG</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{aPropos.congo.titre || "Congo"}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{aPropos.congo.description}</p>
                </div>
              )}
            </div>
          </FadeIn>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-900/30">
        <FadeIn delay={700}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">Un rendez-vous musical à ne pas manquer</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/concerts"
                className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Voir nos concerts
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Nous contacter
              </Link>
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
              {new Date().getFullYear()} SenCamCong
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}