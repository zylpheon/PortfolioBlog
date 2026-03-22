import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { getPost, getAdjacentPosts } from '../utils/posts.js'
import { MDXComponents } from '../components/MDXComponents.jsx'
import ReadingProgress from '../components/ReadingProgress.jsx'
import TableOfContents from '../components/TableOfContents.jsx'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function ArticlePage() {
  const { slug } = useParams()
  const post = useMemo(() => getPost(slug), [slug])
  const { prev, next } = useMemo(() => getAdjacentPosts(slug), [slug])

  if (!post) return <Navigate to="/blog" replace />

  const { component: MDXContent, title, date, tags, readTime, excerpt } = post

  return (
    <motion.div
      key={`article-${slug}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ReadingProgress />

      {/* Article header */}
      <header className="pt-36 pb-12 px-6 md:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body text-xs font-500 text-ink-muted
                         hover:text-ink transition-colors duration-200 mb-8"
            >
              <ArrowLeft size={12} strokeWidth={1.5} />
              Back to articles
            </Link>
          </motion.div>

          {/* Tags */}
          {tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <Tag size={11} strokeWidth={1.5} className="text-ink-muted" />
              {tags.map(tag => (
                <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="tag text-[10px]">
                  {tag}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="font-display font-800 text-[clamp(2rem,5vw,3.8rem)] leading-[1.05]
                       tracking-tight text-ink mb-6 max-w-4xl"
          >
            {title}
          </motion.h1>

          {/* Excerpt */}
          {excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="font-body text-base font-300 italic text-ink-secondary max-w-2xl leading-relaxed mb-8"
            >
              {excerpt}
            </motion.p>
          )}

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-5 text-ink-muted"
          >
            {date && (
              <span className="flex items-center gap-1.5 font-body text-xs">
                <Calendar size={11} strokeWidth={1.5} />
                {formatDate(date)}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5 font-body text-xs">
                <Clock size={11} strokeWidth={1.5} />
                {readTime}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      {/* Article body + TOC */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex gap-16 xl:gap-24">

          {/* Main content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="flex-1 min-w-0"
          >
            <MDXProvider components={MDXComponents}>
              <div className="prose-article">
                <MDXContent />
              </div>
            </MDXProvider>

            {/* Divider */}
            <div className="my-16 h-px bg-border" />

            {/* Prev / Next navigation */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group border border-border hover:border-ink p-5 transition-all duration-300"
                >
                  <span className="section-label block mb-2">← Older</span>
                  <span className="font-display font-600 text-sm text-ink group-hover:underline
                                   underline-offset-2 leading-snug">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group border border-border hover:border-ink p-5 transition-all duration-300 text-right"
                >
                  <span className="section-label block mb-2">Newer →</span>
                  <span className="font-display font-600 text-sm text-ink group-hover:underline
                                   underline-offset-2 leading-snug">
                    {next.title}
                  </span>
                </Link>
              ) : <div />}
            </nav>

            {/* Back to list */}
            <div className="mt-10">
              <Link to="/blog" className="btn-outline">
                <ArrowLeft size={13} />
                All articles
              </Link>
            </div>
          </motion.main>

          {/* TOC sidebar — desktop sticky + mobile floating button handled inside */}
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>

      {/* Mobile TOC floating button — rendered outside the layout column */}
      <TableOfContents mobileOnly />
    </motion.div>
  )
}
