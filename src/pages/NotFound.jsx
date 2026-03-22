import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      key="404"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="font-display font-800 text-[clamp(5rem,20vw,14rem)] leading-none text-border select-none"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-display font-700 text-2xl text-ink mb-4 -mt-4"
      >
        Page not found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-body text-sm text-ink-muted mb-10 max-w-xs"
      >
        That page doesn't exist. Maybe it was moved or never existed.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link to="/" className="btn-outline">
          <ArrowLeft size={13} />
          Back home
        </Link>
      </motion.div>
    </motion.div>
  )
}
