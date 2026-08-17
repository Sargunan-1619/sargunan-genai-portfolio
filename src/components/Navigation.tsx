import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/data/profile'

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'ai-systems', label: 'AI Systems' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

interface NavigationProps {
  activeId: string
}

export default function Navigation({ activeId }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'max-w-4xl' : 'max-w-6xl'
        }`}
      >
        <div
          className={`flex items-center justify-between w-full rounded-full px-5 transition-all duration-500 ${
            scrolled ? 'py-2 glass-panel' : 'py-1'
          }`}
        >
          <button
            onClick={() => scrollTo('hero')}
            className="font-display font-semibold tracking-tight text-paper-100 hover:text-cyan transition-colors"
          >
            {profile.name}
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
                  activeId === item.id
                    ? 'text-cyan'
                    : 'text-paper-500 hover:text-paper-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-paper-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-slow" />
            <span className="whitespace-nowrap">Available</span>
          </div>

          <button
            className="md:hidden p-2 text-paper-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`h-px bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
              />
              <span
                className={`h-px bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mx-5 mt-2 glass-panel rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-3" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                    activeId === item.id
                      ? 'text-cyan bg-white/5'
                      : 'text-paper-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-2 px-4 py-3 font-mono text-xs text-paper-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-slow" />
                Available for AI Engineering Opportunities
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
