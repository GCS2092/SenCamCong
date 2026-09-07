'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const dark = stored ? stored === 'dark' : true
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Changer de thème"
      className="relative w-12 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 transition-colors duration-300 flex items-center px-1"
    >
      <span
        className={`w-5 h-5 rounded-full bg-white dark:bg-black shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs ${
          isDark ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}