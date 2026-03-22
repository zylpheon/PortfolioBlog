import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const ArticleCard = memo(function ArticleCard({ post, index, inView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-border hover:border-ink transition-all duration-300
                 bg-bg hover:shadow-sm overflow-hidden"
    >
      {/* Slide-up ink overlay on hover */}
      <div className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0
                      transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />

      <Link to={`/blog/${post.slug}`} className="relative z-10 flex flex-col h-full p-6 gap-4">

        {/* Top row: number + date */}
        <div className="flex items-center justify-between">
          <span className="section-number group-hover:text-bg/50 transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1 text-ink-muted group-hover:text-bg/50 transition-colors duration-300">
            <Calendar size={10} strokeWidth={1.5} />
            <span className="font-body text-[11px]">{formatDate(post.date)}</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
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
        )}

        {/* Title */}
        <h2 className="font-display font-700 text-[clamp(1rem,1.8vw,1.25rem)] leading-[1.2]
                       tracking-tight text-ink group-hover:text-bg transition-colors duration-300">
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-body text-sm font-400 leading-relaxed text-ink-secondary
                        group-hover:text-bg/70 transition-colors duration-300 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Bottom row: read time + arrow */}
        <div className="flex items-center justify-between pt-2 border-t border-border
                        group-hover:border-bg/20 transition-colors duration-300 mt-auto">
          <div className="flex items-center gap-1 text-ink-muted group-hover:text-bg/50 transition-colors duration-300">
            <Clock size={11} strokeWidth={1.5} />
            <span className="font-body text-xs">{post.readTime}</span>
          </div>
          <ArrowUpRight
            size={15}
            strokeWidth={1.5}
            className="text-ink-muted group-hover:text-bg transition-all duration-300
                       group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </motion.article>
  )
})

export default ArticleCard
