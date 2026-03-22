import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

export default function SearchFilter({ query, onQuery, activeTag, onTag, allTags }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  // Keyboard shortcut: Cmd/Ctrl+K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex flex-col gap-5">
      {/* Search input */}
      <div className={`flex items-center gap-3 border px-4 py-3 transition-colors duration-200
                       ${focused ? 'border-ink' : 'border-border'}`}>
        <Search size={14} strokeWidth={1.5} className="text-ink-muted flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => onQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search articles…"
          className="flex-1 bg-transparent font-body text-sm text-ink placeholder:text-ink-muted
                     outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => onQuery('')}
              className="text-ink-muted hover:text-ink transition-colors duration-200"
              aria-label="Clear search"
            >
              <X size={13} strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>
        <span className="hidden sm:flex items-center font-display text-[9px] font-600 tracking-wider
                         uppercase text-ink-muted border border-border px-1.5 py-0.5 select-none">
          ⌘K
        </span>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTag('All')}
          className={activeTag === 'All' ? 'tag-active' : 'tag'}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => onTag(tag === activeTag ? 'All' : tag)}
            className={activeTag === tag ? 'tag-active' : 'tag'}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
