$content = @'
import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez SenCamCong pour vos demandes de booking, presse ou partenariats.",
}

import BackgroundImage from '@/components/BackgroundImage'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678"

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      
      {/* Page Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <BackgroundImage
          section="contact"
          overlayOpacity="bg-black/20"
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 1600 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000000'/%3E%3Cstop offset='33%25' stop-color='%230a2e0a'/%3E%3Cstop offset='66%25' stop-color='%232e1d00'/%3E%3Cstop offset='100%25' stop-color='%231a0000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill-opacity='0.08'%3E%3Ccircle cx='200' cy='200' r='200' fill='%2322c55e'/%3E%3Ccircle cx='1400' cy='700' r='180' fill='%23eab308'/%3E%3Ccircle cx='800' cy='450' r='150' fill='%23ef4444'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          }
        />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex gap-3 mb-6">
            <div className="w-16 md:w-24 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-16 md:w-24 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-16 md:w-24 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Contact</h1>
          <p className="text-lg md:text-2xl text-gray-300">Contactez-nous pour toute demande</p>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 pb-24 md:pb-12">

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {/* Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Nom</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 md:py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Email</label>
                <input
                  type="email"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 md:py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 md:py-3 text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Informations</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">contact@sencamcong.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Telephone</p>
                    <p className="text-white">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Suivez-nous</h2>
              <div className="flex gap-3">
                
                  href="https://www.instagram.com/sencamcong/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                  aria-label="Instagram SenCamCong"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                  aria-label="WhatsApp SenCamCong"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12.017 0C5.396 0 .017 5.377.017 12c0 2.088.545 4.128 1.58 5.926L.017 24l6.207-1.629A11.94 11.94 0 0012.017 24c6.62 0 12-5.377 12-12s-5.38-12-12-12zm0 21.933a9.9 9.9 0 01-5.052-1.383l-.363-.216-3.685.967.983-3.593-.237-.369a9.9 9.9 0 01-1.516-5.289c0-5.478 4.457-9.933 9.937-9.933 2.655 0 5.15 1.034 7.024 2.91a9.86 9.86 0 012.913 7.02c0 5.478-4.458 9.933-9.937 9.933z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
'@

[System.IO.File]::WriteAllText("$PWD\src\app\contact\page.tsx", $content, [System.Text.Encoding]::UTF8)
Write-Output "Fichier contact ecrit avec succes"