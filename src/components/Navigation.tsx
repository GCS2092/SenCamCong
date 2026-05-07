'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Music, Users, Camera, MessageSquare } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/concerts', label: 'Concerts', icon: Music },
    { href: '/membres', label: 'Membres', icon: Users },
    { href: '/galerie', label: 'Galerie', icon: Camera },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Logo size="sm" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tight">SenCamCong</span>
                <span className="text-xs text-gray-400 tracking-wider hidden sm:inline">| Trois Terres, Une Voix</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/concerts" className="text-gray-300 hover:text-white transition-colors">Concerts</Link>
              <Link href="/membres" className="text-gray-300 hover:text-white transition-colors">Membres</Link>
              <Link href="/galerie" className="text-gray-300 hover:text-white transition-colors">Galerie</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>

            {/* Color accent line */}
            <div className="hidden md:flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-zinc-800">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition-all ${
                  isActive ? 'bg-zinc-800' : 'hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-xs ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
