import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function FeaturedCard({ post }) {
  if (!post) return null
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="group relative border border-ink bg-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-ink scale-y-0 group-hover:scale-y-100 origin-bottom
                      transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />

      <Link to={`/blog/${post.slug}`} className="relative z-10 flex flex-col md:flex-row gap-0">

        {/* Left accent bar */}
        <div className="hidden md:flex flex-col items-center justify-between py-8 px-5
                        border-r border-border group-hover:border-bg/20 transition-colors duration-300 min-w-[72px]">
          <span className="font-display text-[9px] font-600 tracking-widest uppercase text-ink-muted
                           group-hover:text-bg/50 transition-colors duration-300 [writing-mode:vertical-rl] rotate-180">
            Featured
          </span>
          <span className="font-display text-[10px] font-600 text-ink-muted
                           group-hover:text-bg/50 transition-colors duration-300">
            01
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 p-8 flex-1">
          <div className="flex items-center gap-3">
            <span className="section-label group-hover:text-bg/50 transition-colors duration-300">
              Latest post
            </span>
            <span className="w-4 h-px bg-border group-hover:bg-bg/20 transition-colors duration-300" />
            <div className="flex items-center gap-1 text-ink-muted group-hover:text-bg/50 transition-colors duration-300">
              <Calendar size={10} strokeWidth={1.5} />
              <span className="font-body text-[11px]">{formatDate(post.date)}</span>
            </div>
          </div>

          <h2 className="font-display font-800 text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.1]
                         tracking-tight text-ink group-hover:text-bg transition-colors duration-300">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="font-body text-base font-400 leading-relaxed text-ink-secondary
                          group-hover:text-bg/70 transition-colors duration-300 max-w-2xl">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border
                          group-hover:border-bg/20 transition-colors duration-300">
            <div className="flex flex-wrap gap-1.5">
              {post.tags?.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-body font-500 px-2 py-0.5 border border-border
                             text-ink-muted group-hover:border-bg/30 group-hover:text-bg/60
                             transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-ink-muted group-hover:text-bg/60 transition-colors duration-300">
              <div className="flex items-center gap-1">
                <Clock size={11} strokeWidth={1.5} />
                <span className="font-body text-xs">{post.readTime}</span>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
