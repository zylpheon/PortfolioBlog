import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '../data/index.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border py-10 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display text-sm font-700 tracking-widest text-ink uppercase">
            {siteConfig.initials}
          </Link>
          <span className="w-px h-4 bg-border" />
          <p className="font-body text-xs text-ink-muted">© {year} {siteConfig.fullName}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-5">
          <Link to="/" className="font-body text-xs font-500 text-ink-muted hover:text-ink transition-colors duration-200">Home</Link>
          <Link to="/blog" className="font-body text-xs font-500 text-ink-muted hover:text-ink transition-colors duration-200">Articles</Link>
          <a href={siteConfig.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-body text-xs font-500 text-ink-muted hover:text-ink transition-colors duration-200">
            Portfolio <ExternalLink size={9} />
          </a>
        </nav>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="font-display text-[10px] font-600 tracking-widest uppercase text-ink-muted hover:text-ink transition-colors duration-200 hidden lg:block"
        >
          Back to top ↑
        </motion.button>
      </div>
    </footer>
  )
}
