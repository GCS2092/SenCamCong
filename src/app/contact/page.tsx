import Navigation from '@/components/Navigation'
import type { Metadata } from 'next'
import { Mail, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez SenCamCong pour vos demandes de booking, presse ou partenariats.",
}

import BackgroundImage from '@/components/BackgroundImage'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33612345678"
const contactEmail = "contact@sencamcong.com"

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="bg-black min-h-screen">
      <Navigation />

      {/* Page Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <BackgroundImage
          section="contact"
          overlayOpacity="bg-gradient-to-b from-black/60 via-black/40 to-black/80"
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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">Contact</h1>
          <p className="text-lg md:text-2xl text-gray-200 drop-shadow-lg">Contactez-nous pour toute demande</p>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 pb-24 md:pb-12">

        {/* Contact methods */}
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          
            href={`mailto:${contactEmail}`}
            className="group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-yellow-500/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-300"
          <a>
            <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors duration-300">
              <Mail className="w-6 h-6 text-yellow-500 group-hover:text-black transition-colors duration-300" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Par email</h2>
            <p className="text-gray-400 text-sm break-all">{contactEmail}</p>
          </a>

          
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-green-500/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300"
          <a>
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
              <MessageCircle className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Sur WhatsApp</h2>
            <p className="text-gray-400 text-sm">Réponse rapide</p>
          </a>
        </div>

        {/* Social */}
        <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 md:p-8">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-1 bg-green-500 rounded-full"></div>
            <div className="w-8 h-1 bg-yellow-500 rounded-full"></div>
            <div className="w-8 h-1 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Suivez-nous</h2>
          <p className="text-gray-400 text-sm mb-6">Actus, coulisses et prochains concerts</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a href="https://www.facebook.com/share/1C6aUmdeeZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-zinc-800/80 rounded-xl py-5 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300" aria-label="Facebook SenCamCong">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              <span className="text-xs text-gray-300">Facebook</span>
            </a>

            <a href="https://www.instagram.com/sencamcong?stkn=MTlydDJ3Y2R2cHVnbg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-zinc-800/80 rounded-xl py-5 hover:bg-pink-600 hover:-translate-y-0.5 transition-all duration-300" aria-label="Instagram SenCamCong">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-xs text-gray-300">Instagram</span>
            </a>

            <a href="https://youtube.com/@sencamcong?si=wNS1nx5CxQ5yv2-z" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-zinc-800/80 rounded-xl py-5 hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300" aria-label="YouTube SenCamCong">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-xs text-gray-300">YouTube</span>
            </a>

            <a href="https://www.tiktok.com/@sencamcong.music?_r=1&_t=ZS-99XfpDdPXwy" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-zinc-800/80 rounded-xl py-5 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 group" aria-label="TikTok SenCamCong">
              <svg className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
              <span className="text-xs text-gray-300 group-hover:text-black transition-colors duration-300">TikTok</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}