import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from 'lucide-react'

function extractHeadings() {
  const nodes = document.querySelectorAll('.prose-article h2, .prose-article h3')
  return Array.from(nodes)
    .map(el => ({ id: el.id, text: el.textContent.trim(), level: parseInt(el.tagName[1]) }))
    .filter(h => h.id)
}

// mobileOnly prop: renders only the floating button (avoids double desktop sidebar)
export default function TableOfContents({ mobileOnly = false }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeadings(extractHeadings()), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
    setOpen(false)
  }

  if (!headings.length) return null

  /* ── Desktop sticky sidebar ── */
  if (!mobileOnly) {
    return (
      <nav className="sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <p className="section-label mb-4">Contents</p>
        <ul className="flex flex-col gap-0.5">
          {headings.map(h => (
            <li key={h.id}>
              <button
                onClick={() => scrollTo(h.id)}
                className={`text-left w-full font-body text-[12px] leading-snug py-1.5
                            transition-all duration-200
                            ${h.level === 3 ? 'pl-3' : ''}
                            ${activeId === h.id
                              ? 'text-ink font-600'
                              : 'text-ink-muted hover:text-ink-secondary'
                            }`}
              >
                {activeId === h.id && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink mr-2 mb-[2px] align-middle" />
                )}
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  /* ── Mobile floating button (mobileOnly) ── */
  return (
    <div className="xl:hidden fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-bg border border-border shadow-lg p-5 w-64 max-h-72 overflow-y-auto"
          >
            <p className="section-label mb-3">Contents</p>
            <ul className="flex flex-col gap-0.5">
              {headings.map(h => (
                <li key={h.id}>
                  <button
                    onClick={() => scrollTo(h.id)}
                    className={`text-left w-full font-body text-[12px] leading-snug py-1.5
                                transition-colors duration-200
                                ${h.level === 3 ? 'pl-3' : ''}
                                ${activeId === h.id
                                  ? 'text-ink font-600'
                                  : 'text-ink-muted hover:text-ink'
                                }`}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(v => !v)}
        className="w-10 h-10 border border-border bg-bg hover:border-ink
                   flex items-center justify-center text-ink-secondary hover:text-ink
                   transition-all duration-200 shadow-sm"
        aria-label="Table of contents"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'list'}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="absolute"
          >
            {open ? <X size={14} strokeWidth={1.5} /> : <List size={14} strokeWidth={1.5} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
