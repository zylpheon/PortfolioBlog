import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Rss } from 'lucide-react'
import { getAllPosts, getAllTags } from '../utils/posts.js'
import { siteConfig } from '../data/index.js'
import FeaturedCard from '../components/FeaturedCard.jsx'
import ArticleCard from '../components/ArticleCard.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const posts = useMemo(() => getAllPosts(), [])
  const tags = useMemo(() => getAllTags(), [])
  const featured = posts[0]
  const recent = posts.slice(1, 7)

  const recentRef = useRef(null)
  const recentInView = useInView(recentRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 border-b border-border overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="max-w-7xl mx-auto">

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <Rss size={12} strokeWidth={1.5} className="text-ink-muted" />
            <span className="section-label">blog.valen.icu</span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-display font-800 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]
                       tracking-tight text-ink mb-8"
          >
            Writings &<br />
            <span className="italic font-400 text-ink-secondary">Tutorials.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="font-body text-base font-400 text-ink-secondary max-w-lg leading-relaxed mb-10"
          >
            {siteConfig.description}
          </motion.p>

          {/* Tags preview */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-wrap gap-2"
          >
            {tags.slice(0, 8).map(tag => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="tag"
              >
                {tag}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured / Latest ── */}
      <section className="py-20 px-6 md:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0.5}
            className="flex items-center gap-4 mb-8"
          >
            <span className="section-label">Latest</span>
            <span className="flex-1 h-px bg-border" />
          </motion.div>
          <FeaturedCard post={featured} />
        </div>
      </section>

      {/* ── Recent posts grid ── */}
      {recent.length > 0 && (
        <section ref={recentRef} className="py-20 px-6 md:px-10 border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <motion.div
                variants={fadeUp} initial="hidden"
                animate={recentInView ? 'show' : 'hidden'}
                className="flex items-center gap-4"
              >
                <span className="section-label">Recent articles</span>
              </motion.div>
              <motion.div
                variants={fadeUp} initial="hidden"
                animate={recentInView ? 'show' : 'hidden'}
                custom={0.5}
              >
                <Link
                  to="/blog"
                  className="flex items-center gap-2 font-body text-xs font-500 text-ink-secondary
                             hover:text-ink underline underline-offset-4 decoration-border
                             hover:decoration-ink transition-all duration-200"
                >
                  All articles <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recent.map((post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} inView={recentInView} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter-ish CTA ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border p-10 md:p-16 flex flex-col md:flex-row
                       md:items-center justify-between gap-8"
          >
            <div>
              <h2 className="font-display font-700 text-[clamp(1.5rem,3vw,2.2rem)]
                             leading-[1.1] tracking-tight text-ink mb-3">
                Want to follow along?
              </h2>
              <p className="font-body text-sm text-ink-secondary max-w-sm leading-relaxed">
                New tutorials and articles on Full-Stack Dev, IoT, DevOps, and more — written by{' '}
                <a href={siteConfig.portfolioUrl} className="underline underline-offset-2 text-ink hover:opacity-70 transition-opacity">
                  Valentino
                </a>.
              </p>
            </div>
            <Link to="/blog" className="btn-primary whitespace-nowrap self-start md:self-auto">
              Browse all articles
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
