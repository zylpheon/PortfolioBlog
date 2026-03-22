import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { siteConfig } from '../data/index.js'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display text-sm font-700 tracking-widest text-ink uppercase flex items-center gap-2 hover:opacity-70 transition-opacity duration-200"
          >
            {siteConfig.initials}
            <span className="font-body text-[10px] font-400 tracking-widest text-ink-muted normal-case">/ blog</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href === '/blog' && location.pathname.startsWith('/blog'))
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-sm font-500 tracking-wide relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-300 transition-colors duration-200 ${isActive ? 'text-ink after:w-full' : 'text-ink-secondary after:w-0 hover:text-ink hover:after:w-full'}`}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={siteConfig.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs font-500 text-ink-muted hover:text-ink transition-colors duration-200 border border-border px-3 py-1.5 hover:border-ink"
            >
              valen.icu
              <ExternalLink size={10} strokeWidth={1.5} />
            </a>
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button className="flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px bg-ink" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block w-5 h-px bg-ink" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 inset-x-0 z-40 bg-bg/95 backdrop-blur-xl border-b border-border flex flex-col px-6 py-8 gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.28 }}>
                <Link to={link.href} className="font-display text-2xl font-700 text-ink tracking-tight">{link.label}</Link>
              </motion.div>
            ))}
            <motion.a initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.06 }} href={siteConfig.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-body text-sm text-ink-muted">
              ← Back to portfolio <ExternalLink size={11} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
