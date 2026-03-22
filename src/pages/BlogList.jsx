import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getAllPosts, getAllTags } from '../utils/posts.js'
import ArticleCard from '../components/ArticleCard.jsx'
import SearchFilter from '../components/SearchFilter.jsx'

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(() => searchParams.get('tag') || 'All')

  const allPosts = useMemo(() => getAllPosts(), [])
  const allTags = useMemo(() => getAllTags(), [])

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Sync tag from URL
  useEffect(() => {
    const t = searchParams.get('tag')
    if (t) setActiveTag(t)
  }, [searchParams])

  const handleTag = (tag) => {
    setActiveTag(tag)
    if (tag === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ tag })
    }
  }

  const filtered = useMemo(() => {
    let posts = allPosts
    if (activeTag && activeTag !== 'All') {
      posts = posts.filter(p => p.tags?.includes(activeTag))
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      posts = posts.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return posts
  }, [allPosts, activeTag, query])

  return (
    <motion.div
      key="blog-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <section className="pt-36 pb-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="section-label block mb-6"
          >
            All articles
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-display font-800 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]
                       tracking-tight text-ink mb-10"
          >
            {allPosts.length} articles<br />
            <span className="italic font-400 text-ink-secondary">& counting.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            <SearchFilter
              query={query}
              onQuery={setQuery}
              activeTag={activeTag}
              onTag={handleTag}
              allTags={allTags}
            />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section ref={ref} className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="font-display text-2xl font-700 text-ink-muted mb-3">No results</p>
              <p className="font-body text-sm text-ink-muted">
                Try a different search term or tag.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="section-label mb-8"
              >
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                {activeTag !== 'All' ? ` in "${activeTag}"` : ''}
                {query ? ` matching "${query}"` : ''}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((post, i) => (
                  <ArticleCard key={post.slug} post={post} index={i} inView={inView} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </motion.div>
  )
}
