'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="w-16 h-1 bg-yellow-500"></div>
            <div className="w-16 h-1 bg-red-500"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            SenCamCong
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            Sénégal • Cameroun • Congo
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-16 h-1 bg-red-500"></div>
            <div className="w-16 h-1 bg-yellow-500"></div>
            <div className="w-16 h-1 bg-green-500"></div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Un fusion musical unique entre trois cultures africaines vibrantes
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/concerts"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Voir les concerts
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
